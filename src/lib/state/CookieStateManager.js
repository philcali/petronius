import StateManager from './StateManager';

class CookieStateManager extends StateManager {
  _get(key) {
    let parser = /;\s*/;
    let kvPairs = decodeURIComponent(document.cookie).split(parser);
    for (let i = 0; i < kvPairs.length; i++) {
      let kv = kvPairs.split('=');
      if (kv[0] === key) {
        return kv[1];
      }
    }
    return null;
  }

  _put(key, value, expiry) {
    let obj = {};
    obj[key] = value;
    obj.expiry = new Date(expiry).toUTCString();
    obj.path = '/';
    let parts = [];
    for (let field in obj) {
      parts.push([field, obj[field]].join('='));
    }
    document.cookie = parts.join('; ');
  }

  _remove(key) {
    this._put(key, "", new Date(Date.now() - 1000));
  }
}

export default CookieStateManager;
