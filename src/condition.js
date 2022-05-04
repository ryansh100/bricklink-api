//@ts-check
/**
 * Static dictionary of common condition terms to improve code readability.
 *
 * - `Condition.New`
 * - `Condition.Used`
 */
export class Condition {
  /** @type {string} */
  static get New() {
    return 'N';
  }

  /** @type {string} */
  static get Used() {
    return 'U';
  }
}
