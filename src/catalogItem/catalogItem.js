//@ts-check
import { BricklinkRequest } from '../request';

/**
 * Represents a Catalog Item.
 */
export class CatalogItem {
  /**
   * Create a new instance of a Catalog Item
   * @param {object} [data] Data typically returned from an API response.
   */
  constructor(data) {
    data = data || {};

    /** @type {string} */
    this.no = data.no || '';
    /** @type {string} */
    this.name = data.name || '';
    /** @type {string} */
    this.type = data.type || '';
    /** @type {number} */
    this.category_id = data.category_id || data.categoryID || 0;
    /** @type {string} */
    this.alternate_no = data.alternate_no || '';
    /** @type {string} */
    this.image_url = data.image_url || '';
    /** @type {string} */
    this.thumbnail_url = data.thumbnail_url || '';
    /** @type {number} */
    this.weight = data.weight || '';
    /** @type {string} */
    this.dim_x = data.dim_x || '';
    /** @type {string} */
    this.dim_y = data.dim_y || '';
    /** @type {string} */
    this.dim_z = data.dim_z || '';
    /** @type {string} */
    this.year_released = data.year_released || '';
    /** @type {string} */
    this.description = data.description || '';
    /** @type {boolean} */
    this.is_obsolete = data.is_obsolete || false;
    /** @type {string} */
    this.language_code = data.language_code || '';
  }

  /**
   * Method to get a known catalog item
   *
   * Usage:
   *
   * ```
   * var req = CatalogItem.get(ItemType.Part, '3001');
   * client.send(req).then(item => console.log(item));
   * ```
   *
   * @param {string} itemType Catalog item type i.e. - MINIFIG, PART, SET, BOOK, GEAR, CATALOG, INSTRUCTION, UNSORTED_LOT, ORIGINAL_BOX
   * @param {string} itemNumber Catalog item number
   * @return {BricklinkRequest} A request that is ready to execute with a client.
   */
  static get(itemType, itemNumber) {
    const  method = BricklinkRequest.GET;
    const uri = `/items/${itemType}/${itemNumber}`;

    return new BricklinkRequest(method, uri, null, (data) => {
      const item = new CatalogItem(data);
      return item;
    });
  }
}
