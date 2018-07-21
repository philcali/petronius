import CompositeStateManager from './CompositeStateManager.js';
import LocalStorageStateManager from './LocalStorageStateManager.js';
import CookieStateManager from './CookieStateManager.js';

class DefaultStateManager extends CompositeStateManager {
  constructor() {
    super([
        new LocalStorageStateManager(),
        new CookieStateManager()
    ]);
  }
}

export default DefaultStateManager;
