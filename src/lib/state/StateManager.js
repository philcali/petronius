
class StateManager {

  getItem(key) {
    this._get(key);
  }

  _get(key) {
    throw new Error("StateManager::_get is not implemented!");
  }

  putItem(key, value, expiry) {
    this._put(key, value, Date.now() + (expiry * 1000));
  }

  _put(key, value, expiry) {
    throw new Error("StateManager::_put is not implemented!");
  }

  removeItem(key) {
    this._remove(key);
  }

  _remove(key) {
    throw new Error("StateManager::_remove is not implemented!");
  }

  isCompatible() {
    return true;
  }
}

export default StateManager;
