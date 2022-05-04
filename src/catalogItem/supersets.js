//@ts-check
import { BricklinkRequest, RequestParams } from '../request';
import { CatalogItem } from './catalogItem';

/**
 * Represents entries of a superset item.
 */
export class SupersetEntry {
  /**
   * Create an instance of a subset entry
   * @param {object} [data] The API response data
   * @param {object} [data.item] Item information
   * @param {number} [data.quantity] The number of items in the subset entry.
   * @param {string} [data.appear_as] How the entry appears in the superset item.
   */
  constructor(data) {
    data = data || {};
    /** @type {CatalogItem} */
    this.item = data.item ? new CatalogItem(data.item) : new CatalogItem();
    /** @type {number} */
    this.quantity = data.quantity || 0;
    /** @type {string} */
    this.appear_as = data.appear_as || '';
  }
}

/**
 * Represents a super set entry.
 */
export class Superset {
  /**
   * Create an instance of a super set item.
   * @param {object} [data] The API response data
   * @param {object[]} [data.entries] Entries for a superset item.
   * @param {number} [data.color_id] The color id of the superset item.
   */
  constructor(data) {
    data = data || {};
    /** @type {number} */
    this.color_id = data.color_id || 0;

    let entries = data.entries || [];
    /** @type {SupersetEntry[]} */
    this.entries = entries.map((e) => new SupersetEntry(e));
  }

  /**
   * Method to get a superset of a catalog item
   *
   * Usage:
   *
   * ```
   * var req = Superset.get(ItemType.Part, '4593');
   * client.send(req).then(superset => console.log(superset));
   * ```
   *
   * @param {string} itemType Catalog item type
   * @param {string} itemNumber Catalog item number
   * @param {object} options Options that conform to {@link SupersetOptions}.
   * @return {BricklinkRequest} A request that will return an array of {@link Superset} items.
   */
  static get(itemType, itemNumber, options) {
    options = options ? new SupersetOptions(options) : new SupersetOptions();
    let method = BricklinkRequest.GET;
    let uri = `/items/${itemType}/${itemNumber}/supersets`;

    return new BricklinkRequest(method, uri, options, (data) => {
      return data.map((set) => new Superset(set));
    });
  }
}

/**
 * Options that can be used when make a request for a subset.
 */
export class SupersetOptions extends RequestParams {
  /**
   * Make an instance of SubsetOptions.
   * @param {object} [data] Raw options object.
   * @param {number} [data.color_id] The color of the item.
   */
  constructor(data) {
    super();
    data = data || {};
    /** @type {number|null} */
    this.color_id = data.color_id || null;
  }
}
