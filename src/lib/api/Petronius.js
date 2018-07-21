import RestFetch from './RestFetch';

const DEFAULT_BASE_URL = "https://api.petroni.us";

class Petronius {
  constructor(options) {
    this.options = options || {};
    this.options.errorHandler = this.options.errorHandler || (error => { throw error });
    this.fetch = new RestFetch(this.options.baseUrl || DEFAULT_BASE_URL)
      .addResponseHandler(resp => {
        if (!resp.ok) {
          this.options.errorHandler(new Error(resp.statusText));
        }
      })
      .addResponseHandler(resp => resp.json());
    if (this.options.accessToken) {
      this.setAccessToken(options.accessToken);
    }
  }

  isAuthenticated() {
    return this.options.accessToken || false;
  }

  setErrorHandler(errorHandler) {
    this.options.errorHandler = errorHandler;
    return this;
  }

  setAccessToken(accessToken) {
    this.fetch.addInterceptor(headers => {
      headers.append("Authorization", "Bearer " + accessToken);
    });
    return this;
  }

  me() {
    return this.fetch.get('/me');
  }

  settings(settings) {
    if (settings) {
      return this.fetch.put('/settings', { body: settings });
    } else {
      return this.fetch.get('/settings');
    }
  }

  feeds(feedId) {
    if (feedId) {
      return this.fetch.get('/feeds/:feedId', { params: { feedId } });
    } else {
      return this.fetch.get('/feeds');
    }
  }
}

export default Petronius;
