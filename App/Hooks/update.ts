import React from 'react';

const useIsMounted = function useIsMounted() {
  const isMounted = React.useRef(false);

  React.useEffect(function setIsMounted() {
    isMounted.current = true;

    return function cleanupSetIsMounted() {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
};

// normal useEffect also trigger initially, use this one instead if not wanted
const useUpdateEffect: typeof React.useEffect = (effect, deps) => {
  const isMounted = useIsMounted();
  const isInitialMount = React.useRef(true);

  React.useEffect(() => {
    let effectCleanupFunc = function noop() {};

    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effectCleanupFunc = effect() || effectCleanupFunc;
    }
    return () => {
      effectCleanupFunc();
      if (!isMounted.current) {
        isInitialMount.current = true;
      }
    };
  }, deps);
};

export { useIsMounted, useUpdateEffect }
