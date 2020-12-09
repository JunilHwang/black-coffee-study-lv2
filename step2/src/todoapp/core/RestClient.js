import HttpMethod from "../constants/HttpMethod";
import axios from "axios";

export class RestClient {

  _baseURL; _abortController;

  constructor (baseURL) {
    this._baseURL = baseURL;
    this._abortController = new AbortController();
  }

  request (uri, method = HttpMethod.GET) {
    const url = `${this._baseURL}${uri}`;
    return axios({ url, method })
               .then(({ data }) => data);
  }

  requestWithBody (uri, method, body = {}) {
    const url = `${this._baseURL}${uri}`;
    return axios({ url, method, data: body })
               .then(({ data }) => data);
  }

  get (uri) {
    return this.request(uri);
  }

  post (uri, body) {
    return this.requestWithBody(uri, HttpMethod.POST, body);
  }

  put (uri, body) {
    return this.requestWithBody(uri, HttpMethod.PUT, body);
  }

  patch (uri, body) {
    return this.requestWithBody(uri, HttpMethod.PATCH, body);
  }

  delete (uri) {
    return this.request(uri, HttpMethod.DELETE);
  }

  abort () {
    this._abortController.abort();
  }
}
