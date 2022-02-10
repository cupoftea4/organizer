import { useState, useEffect, useRef } from 'react';

export const useThrottle = (search, limit) => {
  //const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(
    () => {
      const handler = setTimeout(function() {
        if (Date.now() - lastRan.current >= limit) {
          search();
          lastRan.current = Date.now();
        }
      }, limit - (Date.now() - lastRan.current));

      return () => {
        clearTimeout(handler);
      };
    },
    [search, limit]
  );

};