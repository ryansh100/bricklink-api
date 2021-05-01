/**
 * Creates a request to use with the client.
 */
export class Request {
  /**
   * Create a new request.
   * @param {string} method The type of HTTP request to perform.
   * @param {string} uri The relative of full path uri of a request to perform. This should not include any query parameters.
   * @param {RequestParams} [params] Additional parameters to include with the request in either post body or query params.
   * @param {function} [callback=null] A callback function to perform after the request has been successfully performed.
   */
  constructor(method, uri, params, callback) {
    /** @type {string} */
    this.method = method;
    /** @type {string} */
    this.uri = uri;
    /** @type {RequestParams} */
    this.params = params || new RequestParams();
    /** @type {function|null} */
    this.callback = callback || null;
  }
  /** @type {string} */
  static get GET() {
    return 'get';
  }

  /** @type {string} */
  static get PUT() {
    return 'put';
  }

  /** @type {string} */
  static get POST() {
    return 'post';
  }

  /** @type {string} */
  static get DELETE() {
    return 'put';
  }
}

/**
 * Represents any query parameters to use with a request.
 */
export class RequestParams {
  /**
   * Convert params for the request to a query string.
   * @return {string} parameters in the format of '?<param>=<value>'.
   */
  toQueryString() {
    let pairs = [];
    for (let member in this) {
      if (this[member] != null) {
        pairs.push(member + '=' + this[member]);
      }
    }
    if (pairs.length > 0) {
      return '?' + pairs.join('&');
    }
    return '';
  }

  /**
   * Convert params for the request to a an object.
   * @return {object} trimmed down parameters object.
   */
  toObject() {
    let params = {};
    for (let member in this) {
      if (this[member] != null) {
        params[member] = this[member];
      }
    }
    return params;
  }
}
