import axios from "axios";

import HttpMethod from "../constants/HttpMethod";

export class RestClient {

  #client; #abortController;

  constructor (baseURL) {
    console.log(baseURL);
    this.#client = axios.create({ baseURL });
    this.#abortController = new AbortController();
  }

  #request (url, method = HttpMethod.GET) {
    return this.#client({ url, method })
               .then(response => response.data);
  }

  #requestWithBody (url, method, body = {}) {
    return this.#client({ url, method, data: body })
               .then(response => response.data);
  }

  get (uri) {
    return this.#request(uri);
  }

  post (uri, body) {
    return this.#requestWithBody(uri, HttpMethod.POST, body);
  }

  put (uri, body) {
    return this.#requestWithBody(uri, HttpMethod.PUT, body);
  }

  patch (uri, body) {
    return this.#requestWithBody(uri, HttpMethod.PATCH, body);
  }

  delete (uri) {
    return this.#request(uri, HttpMethod.DELETE);
  }

  abort () {
    this.#abortController.abort();
  }
}
