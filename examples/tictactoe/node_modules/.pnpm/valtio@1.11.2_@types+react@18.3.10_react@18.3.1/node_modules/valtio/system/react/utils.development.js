System.register(['react', 'valtio/react'], (function (exports) {
  'use strict';
  var useLayoutEffect, useSnapshot;
  return {
    setters: [function (module) {
      useLayoutEffect = module.useLayoutEffect;
    }, function (module) {
      useSnapshot = module.useSnapshot;
    }],
    execute: (function () {

      exports('useProxy', useProxy);

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

    })
  };
}));
