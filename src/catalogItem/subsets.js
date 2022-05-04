//@ts-check
import { BricklinkRequest, RequestParams } from '../request';
import { CatalogItem } from './catalogItem';

/**
 * Represents a subset entry.
 */
export class SubsetEntry {
  /**
   * Create an instance of a subset entry
   * @param {object} [data] The API response data
   * @param {object} [data.item] Item information
   * @param {number} [data.color_id] The color id of the entry item.
   * @param {number} [data.quantity] The number of items in the subset entry.
   * @param {number} [data.extra_quantity] The number of extra items included in the subset.
   * @param {boolean} [data.is_alternate] Indicator that the item is an alternate.
   */
  constructor(data) {
    data = data || {};
    /** @type {CatalogItem} */
    this.item = data.item ? new CatalogItem(data.item) : new CatalogItem();
    /** @type {number} */
    this.color_id = data.color_id || 0;
    /** @type {number} */
    this.quantity = data.quantity || 0;
    /** @type {number} */
    this.extra_quantity = data.extra_quantity || 0;
    /** @type {boolean} */
    this.is_alternate = data.is_alternate || false;
  }
}
/**
 * Represents a subset item. A subset item can have more than one matching entry due to alternate parts.
 */
export class Subset {
  /**
   * Create an instance of a subset item.
   * @param {object} [data] The response data from API request.
   * @param {number} [data.match_no] The number of matching entries or 0 if there is no matching of alternative item.
   * @param {object} [data.entries] The specific entries for the subset item.
   */
  constructor(data) {
    data = data || {};
    /** @type {number} */
    this.match_no = data.match_no || 0;

    const entries = data.entries || [];
    /** @type {SubsetEntry[]} */
    this.entries = entries.map((e) => new SubsetEntry(e));
  }
  /**
   * Method to get a subset of a catalog item.
   *
   * Usage:
   *
   * ```
   * var req = Subset.get(ItemType.Set, '6020-1', {break_minifigs: true});
   * client.send(req).then(subset => console.log(subset));
   * ```
   *
   * @param {string} itemType Catalog item type
   * @param {string} itemNumber Catalog item number
   * @param {object} options Options that conform to {@link SubsetOptions}.
   */
  static get(itemType, itemNumber, options) {
    const method = BricklinkRequest.GET;
    options = options ? new SubsetOptions(options) : new SubsetOptions();

    const uri = `/items/${itemType}/${itemNumber}/subsets`;

    return new BricklinkRequest(method, uri, options, (data) => {
      return data.map((e) => new Subset(e));
    });
  }
}

/**
 * Options that can be used when make a request for a subset.
 */
export class SubsetOptions extends RequestParams {
  /**
   * Make an instance of SubsetOptions.
   * @param {object} [data] Raw options object.
   * @param {number} [data.color_id] The color of the item(This value is valid only for {@link ItemType}.Part.
   * @param {boolean} [data.box] Indicates whether the set includes the original box
   * @param {boolean} [data.instruction] Indicates whether the set includes the original instruction
   * @param {boolean} [data.break_minifigs]	Indicates whether the result breaks down minifigs as parts
   * @param {boolean} [data.break_subsets] Indicates whether the result breaks down sets in set
   */
  constructor(data) {
    super();
    data = data || {};
    /** @type {number|null} */
    this.color_id = data.color_id || null;
    /** @type {boolean|null} */
    this.box = data.box || null;
    /** @type {boolean|null} */
    this.instruction = data.instruction || null;
    /** @type {boolean|null} */
    this.break_minifigs = data.break_minifigs || null;
    /** @type {boolean|null} */
    this.break_subsets = data.break_subsets || null;
  }
}
