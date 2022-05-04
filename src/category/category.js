//@ts-check
import { BricklinkRequest } from '../request';

/**
 * Represents a Category
 */
export class Category {
  /**
   * Create a new instance of a category
   * @param {object} [data] API response data.
   * @param {number} [data.category_id=0] The category id. i.e. - 10
   * @param {string} [data.category_name] The category name. i.e. - Container
   * @param {number} [data.parent_id] The parent category id or 0 if root category. i.e. - 0
   */
  constructor(data) {
    data = data || {};
    /** @type {number} */
    this.category_id = data.category_id || 0;
    /** @type {string} */
    this.category_name = data.category_name || '';
    /** @type {number} */
    this.parent_id = data.parent_id || 0;
  }

  /**
   * Method to get a specific category
   *
   * Usage:
   *
   * ```
   * var req = Category.get(123);
   * client.send(req).then(category => console.log(category));
   * ```
   *
   * @param {number} categoryId Catalog item type
   * @return {BricklinkRequest} A request that resolves to a {@link Category} instance.
   */
  static get(categoryId) {
    let method = BricklinkRequest.GET;
    let uri = `/categories/${categoryId}`;

    return new BricklinkRequest(method, uri, null, (data) => new Category(data));
  }

  /**
   * Get a list of all colors
   * Usage:
   *
   * ```
   * var req = Category.all();
   * client.send(req).then(categories => console.log(categories));
   * ```
   *
   * @return {BricklinkRequest} A request that resolves to an array of {@link Category}.
   */
  static all() {
    let method = BricklinkRequest.GET;
    let uri = `/categories`;

    return new BricklinkRequest(method, uri, null, (data) =>
      data.map((d) => new Category(d)),
    );
  }
}
