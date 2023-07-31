import { BricklinkRequest } from '../request';

const fixedPointNumberZero = '0.0000';
/**
 * @ignore
 */
function clearFixedPointNumberIfNotZero(input) {
  if (input === fixedPointNumberZero) {
    return undefined;
  }
  return input;
}

/**
 * Represents an inventory object
 */
export class Inventory {
  /**
   * Create a new instance of a store inventory
   * @param {object} [data] API response data.
   * @param {number} [data.inventory_id] The inventory id. i.e. - 50592684
   * @param {object} [data.item] The inventory item.
   * @param {string} [data.item.no] The inventory item id. i.e. - bel004
   * @param {string} [data.item.name] The inventory item name. i.e. - Belville Accessories - Complete Sprue - Perfume Bottles (same as 6932)
   * @param {string} [data.item.type] The inventory item type. i.e. - MINIFIG, PART, SET, BOOK, GEAR, CATALOG, INSTRUCTION, UNSORTED_LOT, ORIGINAL_BOX
   * @param {string} [data.item.categoryID] The inventory item type. i.e. - PART
   * @param {number} [data.color_id] The inventory item color id. i.e. - 5
   * @param {number} [data.quantity] The number of items included in this inventory. i.e. - 10
   * @param {string} [data.new_or_used] Whether the inventory item is new or used. i.e. - U or N
   * @param {string} [data.completeness] Whether the inventory set is complete or incomplete. i.e. - C, B or S
   * @param {string} [data.unit_price] 	The original price of this item per sale unit
   * @param {number} [data.bind_id] The ID of the parent lot that this lot is bound to
   * @param {string} [data.description] A short description for this inventory
   * @param {string} [data.remarks] User remarks on this inventory
   * @param {number} [data.bulk] Buyers can buy this item only in multiples of the bulk amount
   * @param {boolean} [data.is_retain] Whether the item retains in inventory after it is sold out
   * @param {boolean} [data.is_stock_room] Whether the inventory item appears only in the owner's inventory. ie. - true
   * @param {string} [data.stock_room_id] The inventory stockroom identifier. i.e. - A, B or C
   * @param {string|Date} [data.date_created]
   * @param {number} [data.sale_rate]
   * @param {string} [data.my_cost]
   * @param {number} [data.tier_quantity1]
   * @param {string} [data.tier_price1]
   * @param {number} [data.tier_quantity2]
   * @param {string} [data.tier_price2]
   * @param {number} [data.tier_quantity3]
   * @param {string} [data.tier_price3]
   */
  constructor(data) {
    data = data || {};

    /** @type {number} */
    this.inventory_id = data.inventory_id || undefined;
    /** @type {object} */
    this.item = data.item || {
      no: data.item.no || undefined,
      name: data.item.name || undefined,
      type: data.item.type || undefined,
      categoryID: data.item.categoryID || undefined,
    };
    /** @type {number} */
    this.color_id = data.color_id || undefined;
    /** @type {number} */
    this.quantity = data.quantity || undefined;
    /** @type {string} */
    this.new_or_used = data.new_or_used || undefined;
    /** @type {string} */
    this.completeness = data.completeness || undefined;
    /** @type {string} */
    this.unit_price = data.unit_price || undefined;
    /** @type {number} */
    this.bind_id = data.bind_id || undefined;
    /** @type {string} */
    this.description = data.description || undefined;
    /** @type {string} */
    this.remarks = data.remarks || undefined;
    /** @type {number} */
    this.bulk = data.bulk || undefined;
    /** @type {boolean} */
    this.is_retain = data.is_retain !== undefined ? data.is_retain : undefined;
    /** @type {boolean} */
    this.is_stock_room =
      data.is_stock_room !== undefined ? data.is_stock_room : undefined;
    /** @type {string} */
    this.stock_room_id = data.stock_room_id || undefined;
    /** @type {Date} */
    this.date_created =
      (typeof data.date_created === 'string'
        ? new Date(data.date_created)
        : data.date_created) || undefined;
    /** @type {number} */
    this.sale_rate = data.sale_rate || undefined;
    /** @type {string} */
    this.my_cost = data.my_cost || undefined;
    /** @type {number} */
    this.tier_quantity1 = data.tier_quantity1 || undefined;
    /** @type {string} */
    this.tier_price1 =
      clearFixedPointNumberIfNotZero(data.tier_price1) || undefined;
    /** @type {number} */
    this.tier_quantity2 = data.tier_quantity2 || undefined;
    /** @type {string} */
    this.tier_price2 =
      clearFixedPointNumberIfNotZero(data.tier_price2) || undefined;
    /** @type {number} */
    this.tier_quantity3 = data.tier_quantity3 || undefined;
    /** @type {string} */
    this.tier_price3 =
      clearFixedPointNumberIfNotZero(data.tier_price3) || undefined;
  }

  /**
   * Create an inventory item
   *
   * Usage:
   *
   * ```
   * var req = Inventory.create(inventory);
   * client.send(req).then(inventory => console.log(inventory));
   * ```
   * @param {Inventory|Inventory[]} resource The inventory item to update
   * @return {BricklinkRequest} A request that resolves to a single {@link Inventory} or undefined if multiple.
   */
  static create(resource) {
    const method = BricklinkRequest.POST;
    const uri = '/inventories';

    const isMultiple = resource instanceof Array;

    return new BricklinkRequest(
      method,
      uri,
      null,
      (data) => (isMultiple ? undefined : new Inventory(data)),
      resource,
    );
  }

  /**
   * Method to get specific inventory resource
   *
   * Usage:
   *
   * ```
   * var req = Inventory.get(10);
   * client.send(req).then(inventory => console.log(inventory));
   * ```
   *
   * @param {number} inventoryId An inventory id.
   * @return {BricklinkRequest} A request that resolves to an {@link Inventory} instance.
   */
  static get(inventoryId) {
    const method = BricklinkRequest.GET;
    const uri = `/inventories/${inventoryId}`;

    return new BricklinkRequest(
      method,
      uri,
      null,
      null,
      (data) => new Inventory(data),
    );
  }

  /**
   * Get a list of all inventory
   *
   * Usage:
   *
   * ```
   * var req = Inventory.all();
   * client.send(req).then(inventories => console.log(inventories));
   * ```
   *
   * @return {BricklinkRequest} A request that resolves to an array of {@link Inventory}.
   */
  static all() {
    const method = BricklinkRequest.GET;
    const uri = '/inventories';

    return new BricklinkRequest(method, uri, null, (data) =>
      data.map((d) => new Inventory(d)),
    );
  }

  /**
   * Update an inventory item
   *
   * Usage:
   *
   * ```
   * var req = Inventory.update(inventory);
   * client.send(req).then(inventory => console.log(inventory));
   * ```
   * @param {Inventory} resource The inventory item to update
   * @param {number} quantityChange The difference of quantity to apply
   * @return {BricklinkRequest} A request that resolves to an {@link Inventory}.
   */
  static update(resource, quantityChange = 0) {
    const inputResource = new Inventory(resource);
    inputResource.quantity = quantityChange;

    const method = BricklinkRequest.PUT;
    const uri = `/inventories/${resource.inventory_id}`;

    return new BricklinkRequest(
      method,
      uri,
      null,
      (data) => new Inventory(data),
      resource,
    );
  }

  /**
   * Delete an inventory item
   *
   * Usage:
   *
   * ```
   * var req = Inventory.delete(inventory_id);
   * client.send(req).then(inventory => console.log(inventory));
   * ```
   * @param {string} inventory_id The inventory item to update
   * @return {BricklinkRequest} A request that resolves if successfully deleted
   */
  static delete(inventory_id) {
    const method = BricklinkRequest.DELETE;
    const uri = `/inventories/${inventory_id}`;

    return new BricklinkRequest(method, uri, null);
  }
}
