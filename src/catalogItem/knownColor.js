//@ts-check
import { BricklinkRequest } from '../request';

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
   * Method to get a list of known color_id for a given catalog item.
   *
   * Usage:
   *
   * ```
   * var req = KnownColor.get(ItemType.Part, '3001');
   * client.send(req).then(colors => console.log(colors));
   * ```
   *
   * @param {string} itemType Catalog item type
   * @param {string} itemNumber Catalog item number
   * @return {BricklinkRequest} A request that resolves to a list of {@link KnownColor}.
   */
  static get(itemType, itemNumber) {
    let method = BricklinkRequest.GET;
    let uri = `/items/${itemType}/${itemNumber}/colors`;

    return new BricklinkRequest(method, uri, null, (data) => {
      return data.map((color) => new KnownColor(color));
    });
  }
}
