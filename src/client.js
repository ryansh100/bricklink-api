//@ts-check
import { OAuthHelper } from './oAuthHelper';
import { CatalogItem } from './catalogItem/catalogItem';
import { PriceGuide } from './catalogItem/priceGuide';
import { KnownColor } from './catalogItem/knownColor';
import { ItemImage } from './catalogItem/itemImage';
import { Subset } from './catalogItem/subsets';
import { Superset } from './catalogItem/supersets';
import { logger } from './logger';
import { BricklinkRequest } from './request';
import fetch from 'node-fetch'

/**
 * Create a client to perform
 */
export class Client {
  /**
   * Create an instance of the Bricklin Node Client.
   * @param {object} [options] Options that are used to create a new client.
   * @param {string} [options.token] The `TokenValue` from {@link https://www.bricklink.com/v2/api/register_consumer.page}
   * @param {string} [options.token_secret] The `TokenSecret` from {@link https://www.bricklink.com/v2/api/register_consumer.page}
   * @param {string} [options.consumer_key] The `ConsumerKey` from {@link https://www.bricklink.com/v2/api/register_consumer.page}
   * @param {string} [options.consumer_secret] The `ConsumerSecret` from {@link https://www.bricklink.com/v2/api/register_consumer.page}
   * @param {string} [options.endpoint='https://api.bricklink.com/api/store/v1/'] The url of the Bricklink API.
   */
  constructor(options) {
    options = options || {};

    /** @type {string} */
    this.token = options.token || '';
    /** @type {string} */
    this.token_secret = options.token_secret || '';
    /** @type {string} */
    this.consumer_key = options.consumer_key || '';
    /** @type {string} */
    this.consumer_secret = options.consumer_secret || '';
    /** @type {string} */
    this.endpoint =
      options.endpoint || 'https://api.bricklink.com/api/store/v1/';
    /** @type {Function[]} */
    this.requestQueue = [];
  }


  /**
   * Performs a concurrent-safe bricklink request and the callback upon success.
   * @param {BricklinkRequest} req The request to perform.
   * @return {Promise} The data that has been return from the API request and any callbacks.
   */
  send(req) {
    const promise = new Promise((resolve, reject) => {
      const callback = () => this.dispatch(req).then(resolve).catch(reject).finally(() => {
        const deleteIndex = this.requestQueue.indexOf(callback);
        this.requestQueue.splice(deleteIndex, 1);
        if (this.requestQueue.length > 0) {
          const continueQueue = this.requestQueue[0];
          continueQueue();
        }
      });
      this.requestQueue.push(callback);
      if (this.requestQueue.length === 1) {
        const startQueue = this.requestQueue[0];
        startQueue();
      }
    });
    return promise;
  }

  /**
   * Performs a bricklink request and the callback upon success.
   * @param {BricklinkRequest} req The request to perform.
   * @return {Promise} The data that has been return from the API request and any callbacks.
   */
  dispatch(req) {
    const resourceURL = this.endpoint + req.uri.replace(/^\//, '') + req.params.toQueryString();
    /** @type {import('node-fetch').RequestInit} */
    const init = {
      method: req.method,
      headers: {},
    };

    const oauthHelper = new OAuthHelper(this.consumer_key, this.token);
    oauthHelper.sign(resourceURL, req, this.consumer_secret, this.token_secret);

    init.headers['authorization'] = oauthHelper.header;

    const promise = fetch(resourceURL, init)
      .then(response => response.json())
      .then(
        /**
         * @param {any} payload Any object
         */
        (payload) => {
          if (payload.meta.code >= 300) {
            const error = new Error(
              'Received an error from the BrickLink servers',
            );
            logger(
              JSON.stringify(
                {
                  reqestURI: resourceURL,
                  responseMetadata: payload.meta,
                },
                null,
                2,
              ),
            );
            throw error;
          } else {
            return payload.data
          }
        })

    promise.catch(error => {
      logger(error);
    });

    if (req.callback) {
      return promise.then(req.callback)
    }

    return promise;
  }

  /**
   * Get a catalog item by type and identification number.
   * @param {string} itemType An item type as can be foud at {@link ItemType}.
   * @param {string} itemNumber An item identification number.
   * @return {Promise<CatalogItem>} A promise that resolves to a catalog item.
   */
  getCatalogItem(itemType, itemNumber) {
    const req = CatalogItem.get(itemType, itemNumber);

    return this.send(req);
  }

  /**
   * Get the price guide for a given catalog item.
   * @param {string} itemType An item type as can be foud at {@link ItemType}.
   * @param {string} itemNumber An item identification number.
   * @param {object} params Options for the price guide as outlined in {@link PriceGuideOptions}.
   * @return {Promise<PriceGuide>} A promise that resolves to a price guide.
   */
  getPriceGuide(itemType, itemNumber, params) {
    const req = PriceGuide.get(itemType, itemNumber, params);

    return this.send(req);
  }

  /**
   * Get known colors for a catalog item.
   * @param {string} itemType An item type as can be foud at {@link ItemType}.
   * @param {string} itemNumber An item identification number.
   * @return {Promise<Array>} A promise that resolves to a list of {@link KnownColor}.
   */
  getKnownColors(itemType, itemNumber) {
    const req = KnownColor.get(itemType, itemNumber);

    return this.send(req);
  }

  /**
   * Can get an image for a specific image color of a known catalog item.
   * @param {string} itemType An item type as can be foud at {@link ItemType}.
   * @param {string} itemNumber An item identification number.
   * @param {number} colorId The color id of the item.
   * @return {Promise<ItemImage>} A promise that resolves to an Item Image.
   */
  getItemImage(itemType, itemNumber, colorId) {
    const req = ItemImage.get(itemType, itemNumber, colorId);
    return this.send(req);
  }

  /**
   * Gets a subset of a catalog item.
   * @param {string} itemType An item type as can be foud at {@link ItemType}.
   * @param {string} itemNumber An item identification number.
   * @param {object} [params] Options for the price guide as outlined in {@link SubsetOptions}.
   * @return {Promise<Array>} A promise that resolves to a  list of {@link Subset}.
   */
  getItemSubset(itemType, itemNumber, params) {
    const req = Subset.get(itemType, itemNumber, params);
    return this.send(req);
  }

  /**
   * Gets a superset of a catalog item.
   * @param {string} itemType An item type as can be foud at {@link ItemType}.
   * @param {string} itemNumber An item identification number.
   * @param {object} [params] Options for the price guide as outlined in {@link SupersetOptions}.
   * @return {Promise<Array>} A promise that resolves to a  list of {@link Superset}.
   */
  getItemSuperset(itemType, itemNumber, params) {
    const req = Superset.get(itemType, itemNumber, params);
    return this.send(req);
  }
}
