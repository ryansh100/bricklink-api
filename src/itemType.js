//@ts-check
/**
 * Static dictionary of common catalog item types to improve code readability.
 */
export class ItemType {
  /** @type {string} */
  static get Set() {
    return 'SET';
  }
  /** @type {string} */
  static get Minifigure() {
    return 'MINIFIG';
  }
  /** @type {string} */
  static get Part() {
    return 'PART';
  }
  /** @type {string} */
  static get Book() {
    return 'BOOK';
  }
  /** @type {string} */
  static get Gear() {
    return 'GEAR';
  }
  /** @type {string} */
  static get Catalog() {
    return 'CATALOG';
  }
  /** @type {string} */
  static get Instruction() {
    return 'INSTRUCTION';
  }
  /** @type {string} */
  static get UnsortedLot() {
    return 'UNSORTED_LOT';
  }
  /** @type {string} */
  static get Box() {
    return 'ORIGINAL_BOX';
  }
}
