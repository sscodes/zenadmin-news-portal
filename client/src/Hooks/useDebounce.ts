import { useEffect, useState } from 'react';

export const useDebounce = (key: string, DELAY: number) => {
  const [debouncedKey, setDebouncedKey] = useState(key);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKey(key);
    }, DELAY);

    return () => clearTimeout(timer);
  }, [key]);

  return debouncedKey;
};
