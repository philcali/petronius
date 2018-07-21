
class URLBuilder {
  constructor(options) {
    this.options = options || {};
    this.paths = this.options.paths || [];
    this.search = this.options.search || {};
    this.hasSearch = this.options.search;
  }

  withBaseUrl(baseUrl) {
    this.options.baseUrl = baseUrl;
    return this;
  }

  addPathPart(pathPart) {
    this.paths.push(pathPart);
    return this;
  }

  addQueryParam(name, value, raw) {
    if (!this.search[name]) {
      this.search[name] = [];
    }
    if (!raw) {
      value = encodeURIComponent(value);
    }
    this.search[name].push(value);
    this.hasSearch = true;
    return this;
  }

  build() {
    let baseUrl = this.options.baseUrl;
    if (this.paths.length > 0) {
      baseUrl += '/' + this.paths.map(this._stripSlash).join('/');
    }
    if (this.hasSearch) {
      let parts = [];
      for (let queryParam in this.search) {
        this.search[queryParam].forEach(value => {
          parts.push([queryParam, value].join('='));
        });
      }
      baseUrl += '?' + parts.join('&');
    }
    return baseUrl;
  }

  _stripSlash(path) {
    let dropIndex = path.indexOf('/') === 0 ? 1 : 0;
    return path.substr(dropIndex);
  }
}

class URL {
  static builder() {
    return new URLBuilder(arguments(0) || {});
  }
}

export default URL;
