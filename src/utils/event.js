import { isServer } from './'

export let supportsPassive = false;
if (!isServer) {
  try {
    const opts = {};
    /*eslint getter-return: 0 */
    Object.defineProperty(opts, 'passive', {
      get() {
        supportsPassive = true;
        // no returns.
      }
    });
    window.addEventListener('test-passive', null, opts);
  } catch (e) {/* Ignore */}
}

export function on(target, event, handler, passive = false) {
  !isServer &&
    target.addEventListener(
      event,
      handler,
      supportsPassive ? { capture: false, passive } : false
    );
}

export function off(target, event, handler) {
  !isServer && target.removeEventListener(event, handler);
}
