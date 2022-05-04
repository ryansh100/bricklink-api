//@ts-check
import { BricklinkRequest } from '../request';

/**
 * Represents a color object
 */
export class Color {
  /**
   * Create a new instance of a color
   * @param {object} [data] API response data.
   * @param {number} [data.color_id=0] The color id. i.e. - 10
   * @param {string} [data.color_name] The color name. i.e. - Dark Gray
   * @param {string} [data.color_code] The HTML HEX associated to the color. i.e. - 6b5a5a
   * @param {string} [data.color_type] A group that the color belongs to. i.e. - Solid, Transparent, etc...
   */
  constructor(data) {
    data = data || {};
    /** @type {number} */
    this.color_id = data.color_id || 0;
    /** @type {string} */
    this.color_name = data.color_name || '';
    /** @type {string} */
    this.color_code = data.color_code || '';
    /** @type {string} */
    this.color_type = data.color_type || '';
  }

  /**
   * Method to get specific color details
   *
   * Usage:
   *
   * ```
   * var req = Color.get(10);
   * client.send(req).then(color => console.log(color));
   * ```
   *
   * @param {number} colorId a color id.
   * @return {BricklinkRequest} A request that resolves to a {@link Color} instance.
   */
  static get(colorId) {
    let method = BricklinkRequest.GET;
    let uri = `/colors/${colorId}`;

    return new BricklinkRequest(method, uri, null, (data) => new Color(data));
  }

  /**
   * Get a list of all colors
   *
   * Usage:
   *
   * ```
   * var req = Color.all();
   * client.send(req).then(colors => console.log(colors));
   * ```
   *
   * @return {BricklinkRequest} A request that resolves to an array of {@link Color}.
   */
  static all() {
    let method = BricklinkRequest.GET;
    let uri = `/colors`;

    return new BricklinkRequest(method, uri, null, (data) =>
      data.map((d) => new Color(d)),
    );
  }
}
