//@ts-check
import { BricklinkRequest } from '../request';

/**
 * Represents an image for a specific color of a catalog item.
 */
export class ItemImage {
  /**
   * Create an instance of Item Image
   * @param {object} data The API response data
   * @param {number} [data.color_id=0] Color Id of the image.
   * @param {string} [data.thumbnail_url=''] The Url of the thumbnail image.
   * @param {string} [data.type=''] The type of catalog item as correspondeing to {@link ItemType}.
   * @param {string} [data.no=''] The catalog item's identification number.
   */
  constructor(data) {
    data = data || {};
    /** @type {number} */
    this.color_id = data.color_id || 0;
    /** @type {string} */
    this.thumbnail_url = data.thumbnail_url || '';
    /** @type {string} */
    this.type = data.type || '';
    /** @type {string} */
    this.no = data.no || '';
  }

  /**
   * Method to get an image of a catalog item.
   *
   * Usage:
   *
   * ```
   * var req = ItemImage.get(ItemType.Part, '3001', 0);
   * client.send(req).then(image => console.log(image));
   * ```
   *
   * @param {string} itemType Catalog item type
   * @param {string} itemNumber Catalog item number
   * @param {number} colorId Catalog item's color id.
   */
  static get(itemType, itemNumber, colorId) {
    let method = BricklinkRequest.GET;
    let uri = `/items/${itemType}/${itemNumber}/images/${colorId}`;

    return new BricklinkRequest(method, uri, null, (data) => {
      return new ItemImage(data);
    });
  }
}
