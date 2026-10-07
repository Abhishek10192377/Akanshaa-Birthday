import { useCallback, useEffect, useRef } from 'react';

// setTimeout that cleans up after itself when the component unmounts
export function useTimers() {
  const ids = useRef([]);

  useEffect(() => () => ids.current.forEach(clearTimeout), []);

  return useCallback((fn, ms) => {
    const id = setTimeout(fn, ms);
    ids.current.push(id);
    return id;
  }, []);
}
