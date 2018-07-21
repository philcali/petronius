import StateManager from './StateManager';

const STATE_EXPIRE_SUFFIX = "_ls_ex";

class LocalStorageStateManager extends StateManager {
  _get(key) {
    let data = localStorage.getItem(key);
    if (data) {
      let expiry = localStorage.getItem(key + STATE_EXPIRE_SUFFIX);
      if (!expiry || (expiry && parseInt(expiry, 10) > Date.now())) {
        return data;
      } else {
        this._remove(key);
      }
    }
    return null;
  }

  _put(key, value, expiry) {
    localStorage.putItem(key, value);
    localStorage.putItem(key + STATE_EXPIRE_SUFFIX, expiry);
  }

  _remove(key) {
    localStorage.removeItem(key);
    localStorage.removeItem(key + STATE_EXPIRE_SUFFIX);
  }

  isCompatible() {
    return localStorage || false;
  }
}

export default LocalStorageStateManager;
