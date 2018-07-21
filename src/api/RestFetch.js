import URL from './URL';

class RestFetch {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.interceptors = [];
    this.responseHandler = [];
  }

  addInterceptor(interceptor) {
    this.interceptor.push(interceptor);
    return this;
  }

  addResponseHandler(responseHandler) {
    this.responseHandlers.push(responseHandler);
    return this;
  }

  _headers() {
    let headers = new Headers();
    this.interceptors.forEach(interceptor => interceptor(headers));
    return headers;
  }

  _method(method, path, options) {
    let url = URL.builder()
      .withBaseUrl(this.baseUrl)
      .addPathPart(this._replacePath(path, options.params));
    for (let param in options.params || {}) {
      url.addQueryParam(param, options.params[param]);
    }
    let fetchOptions = {};
    fetchOptions.headers = this._headers();
    fetchOptions.headers.append("Accept", "application/json");
    if (options.body) {
      fetchOptions.headers.append("Content-Type", "application/json");
      fetchOptions.body = JSON.stringify(options.body);
    }
    let fetched = fetch(url.build(), fetchOptions);
    return this.responseHandlers
      .reduce((promise, handler) => promise.then(handler), fetched);
  }

  _replacePath(path, params) {
    let replacedPath = path;
    let partsRegex = new RegExp("^:([^\\/]+)", 'g');
    let groups = path.match(partsRegex) || [];
    groups.forEach(group => {
      let paramKey = group.replace(':', '');
      replacedPath = replacedPath.replace(group, params[paramKey]);
      delete params[paramKey];
    });
    return replacedPath;
  }
}

["GET", "POST", "PUT", "DELETE", "HEAD", "PATCH"].forEach(method => {
  RestFetch.prototype[method.toLowerCase()] = (path, options) => {
    return this._method(method, path, options);
  };
});

export default RestFetch;
