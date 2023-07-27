import oauthSignature from 'oauth-signature';
import {randomBytes} from 'crypto';

/**
 * A helper for OAuth 1.0 header information and signing keys.
 */
export class OAuthHelper {
  /**
   * Intialize the helper
   * @param {string} consumerKey The consumer key
   * @param {string} token The token value
   */
  constructor(consumerKey, token) {
    /** @type {string} */
    this.consumerKey = consumerKey;
    /** @type {string} */
    this.token = token;
    /** @type {string} */
    this.nonce = randomBytes(16).toString('hex');
    /** @type {string} */
    this.signature = '';
    /** @type {string} */
    this.timestamp = Math.round(Date.now() / 1000).toString();
  }

  get parameters() {
    return {
      oauth_consumer_key: this.consumerKey,
      oauth_token: this.token,
      oauth_nonce: this.nonce,
      oauth_timestamp: this.timestamp,
      oauth_signature_method: 'HMAC-SHA1',
      oauth_version: '1.0',
    };
  }

  get header() {
    let str = 'OAuth ';

    let params = Object.assign({ realm: '' }, this.parameters);
    params['oauth_signature'] = this.signature;

    let keys = Object.keys(params);
    let pairs = keys.map((k) => {
      return k + '="' + params[k] + '"';
    });

    str += pairs.join(',');
    return str;
  }

  get queryString() {
    let params = Object.assign({}, this.parameters);
    params['oauth_signature'] = this.signature;
    let str = JSON.stringify(params);
    return 'Authorization=' + str;
  }

  /**
   * Sign the request with oath headers and sets the signature member of the OauthHelper instance.
   */
  sign(url, request, consumerSecret, tokenSecret) {
    let params = Object.assign({}, this.parameters, request.params.toObject());

    this.signature = oauthSignature.generate(
      request.method,
      url,
      params,
      consumerSecret,
      tokenSecret,
    );
  }
}
