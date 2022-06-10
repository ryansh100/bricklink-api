/**
 * An object that represents a BrickLInk API error
 * Catching this error can be used to access HTTPS status codes and error description
 */
export class BrickLinkApiError extends Error {
    /**
     * Create a BrickLink error exception object.
     * @param {Object} meta The object containing error data.
     * @param {number} meta.code The HTTP response status code.
     * @param {string} meta.message The error message.
     * @param {string} meta.description The error description.
     */
    constructor(meta) {
        super(meta.message);
        this.name = this.constructor.name;
        this.meta = meta;
    }
}
