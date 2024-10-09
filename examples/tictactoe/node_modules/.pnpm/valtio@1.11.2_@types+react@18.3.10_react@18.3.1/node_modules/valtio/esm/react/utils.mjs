import { useLayoutEffect } from 'react';
import { useSnapshot } from 'valtio/react';

function useProxy(proxy, options) {
  const snapshot = useSnapshot(proxy, options);
  let isRendering = true;
  useLayoutEffect(() => {
    isRendering = false;
  });
  return new Proxy(proxy, {
    get(target, prop) {
      return isRendering ? snapshot[prop] : target[prop];
    }
  });
}

export { useProxy };
