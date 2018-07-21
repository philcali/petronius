import StateManager from './StateManager';

class CompositeStateManager extends StateManager {
  constructor(managers) {
    super();
    this.managers = managers;
  }

  _get(key) {
    let value = null;
    this._each(manager => {
      if (!value) {
        value = manager._get(key);
      }
    });
    return value;
  }

  _put(key, value, expiry) {
    this._each(manager => manager._put(key, value, expiry));
  }

  _remove(key) {
    this._each(manager => manager._remove(key));
  }

  _each(thunk) {
    this._compatible().forEach(thunk);
  }

  _compatible() {
    return this.managers.filter(manager => manager.isCompatible());
  }

  isCompatible() {
    return this._compatible().length > 0;
  }
}

export default CompositeStateManager;
