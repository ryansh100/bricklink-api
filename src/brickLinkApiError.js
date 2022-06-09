/**
 * An object that represents a BrickLInk API error
 * Catching this error can be used to access HTTPS status codes and error description
 */
export class BrickLinkApiError extends Error {
    /**
     * Create a new request.
     * @param {BrickLinkResponseMeta} meta The type of HTTP request to perform.
     */
    constructor(meta) {
        super(meta.message);
        this.name = this.constructor.name;
        this.meta = meta;
    }
}

export class BrickLinkResponseMeta {
    /**
     * Create a new request.
     * @param {number} code The type of HTTP request to perform.
     * @param {string} message The error message
     * @param {string} description The error description
     */
    constructor(code, message, description) {
        /** @type {number} */
        this.code = code;
        /** @type {string} */
        this.message = message;
        /** @type {string} */
        this.description = description;
    }
}
