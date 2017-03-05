import {Request} from '../request.es6';

/**
 * Represents a known color object.
 */
export class KnownColor {
  /**
   * Create a new instance of a known color
   * @param {object} [data] API response data.
   * @param {number} [data.color_id=0] The color id.
   * @param {number} [data.quantity=0] The quantity of items with this known color.
   */
  constructor(data) {
    data = data || {};
    /** @type {number} */
    this.color_id = data.color_id || 0;
    /** @type {number} */
    this.quantity = data.quantity || 0;
  }
  /**
   * Method to get a known
   * @param {string} itemType Catalog item type
   * @param {string} itemNumber Catalog item number
   * @return {Request} A request that resolves to a list of {@link KnownColor}.
   */
  static get(itemType, itemNumber) {
    let method = Request.GET;
    let uri = `/items/${itemType}/${itemNumber}/colors`;

    return new Request(method, uri, null, (data) => {
      return data.map(color => new KnownColor(color));
    });
  }
}
