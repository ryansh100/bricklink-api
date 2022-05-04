//@ts-check
import { BricklinkRequest, RequestParams } from '../request';
import { CatalogItem } from './catalogItem';

/**
 * Specific sale price details for a givent item.
 */
export class PriceDetail {
  /**
   * Create a Price Detail instance.
   * @param {object} [data] Data returned from an API response.
   */
  constructor(data) {
    data = data || {};
    /** @type {number} */
    this.quantity = data.quantity || 0;
    /** @type {number} */
    this.unit_price = data.unit_price || 0;
    /** @type {string} */
    this.shipping_available = data.shipping_available || '';
    /** @type {string} */
    this.shipping_available = data.shipping_available || '';
    /** @type {string} */
    this.seller_country_code = data.seller_country_code || '';
    /** @type {string} */
    this.buyer_country_code = data.buyer_country_code || '';
    /** @type {Date|null} */
    this.date_ordered = data.date_ordered ? new Date(data.date_ordered) : null;
  }
}

/**
 * Represents a Price Guide for a catalog item.
 */
export class PriceGuide {
  /**
   * Create a new instance of a price guide.
   * @param {object} [data] Data returned from an API response.
   */
  constructor(data) {
    /** @type {CatalogItem} item The item that belongs to the price guide. */
    this.item = data.item ? new CatalogItem(data.item) : new CatalogItem();
    /** @type {string} new_or_used Whether or not the price guide is new or used condition. */
    this.new_or_used = data.new_or_used || '';
    /** @type {string} */
    this.currency_code = data.currency_code || '';
    /** @type {number} */
    this.min_price = data.min_price || 0;
    /** @type {number} */
    this.max_price = data.max_price || 0;
    /** @type {number} */
    this.avg_price = data.avg_price || 0;
    /** @type {number} */
    this.qty_avg_price = data.qty_avg_price || 0;
    /** @type {number} */
    this.unit_quantity = data.unit_quantity || 0;
    /** @type {number} */
    this.total_quantity = data.total_quantity || 0;
    /** @type {PriceDetail[]} */
    this.price_detail = data.price_detail
      ? data.price_detail.map((detail) => new PriceDetail(detail))
      : [];
  }

  /**
   * Method to get a known catalog item's price guide
   *
   * Usage:
   *
   * ```
   * var req = PriceGuide.get(ItemType.Part, '3001', {new_or_used: Condition.Used});
   * client.send(req).then(guide => console.log(guide));
   * ```
   *
   * @param {string} itemType Catalog item type as found at {@link ItemType}.
   * @param {string} itemNumber Catalog item number
   * @param {object} [params] Params as outlined in {@link PriceGuideOptions}.
   * @return {BricklinkRequest} A request that is ready to execute with a client.
   */
  static get(itemType, itemNumber, params) {
    params = params ? new PriceGuideOptions(params) : new PriceGuideOptions();
    let method = BricklinkRequest.GET;
    let uri = `items/${itemType}/${itemNumber}/price`;

    return new BricklinkRequest(method, uri, params, (data) => {
      return new PriceGuide(data);
    });
  }
}

/**
 * Price guide option request params.
 */
export class PriceGuideOptions extends RequestParams {
  /**
   * Create an instance of Price Guide options.
   * @param {object} [data] Optional parameter data.
   * @param {number|null} [data.color_id=null] The color Identification numbe of the item
   * @param {string} [data.guide_type='stock'] Indicates that which statistics to be provided. Options include "sold" and "stock"
   * @param {string} [data.new_or_used='N'] Indicates the condition of items that are included in the statistics. Acceptable values are: "N": new item (default) and "U": used item
   * @param {string|null} [data.country_code=null]
   * @param {string|null} [data.region=null]
   * @param {string|null} [data.currency_code=null]
   * @param {string} [data.vat='N']
   */
  constructor(data) {
    super();

    data = data || {};
    /** @type {number|null} [data.color_id=null] The color Identification numbe of the item */
    this.color_id = data.color_id || null;
    /** @type {string} [guide_type='stock'] Indicates that which statistics to be provided. Options include "sold" and "stock" */
    this.guide_type = data.guide_type || 'stock';
    /** @type {string} [new_or_used='N'] Indicates the condition of items that are included in the statistics. Acceptable values are: "N": new item (default) and "U": used item */
    this.new_or_used = data.new_or_used || 'N';
    /** @type {string|null} [country_code=null] */
    this.country_code = data.country_code || null;
    /** @type {string|null} [region=null] */
    this.region = data.region || null;
    /** @type {string|null} [currency_code=null] */
    this.currency_code = data.currency_code || null;
    /** @type {string} [vat='N'] */
    this.vat = data.vat || 'N';
  }
}
