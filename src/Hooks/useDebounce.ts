import { useEffect, useState } from 'react';

export const useDebounce = (key: string, delay: number) => {
  const [debouncedKey, setDebouncedKey] = useState(key);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKey(key);
    }, delay);

    return () => clearTimeout(timer);
  }, [key]);

  return debouncedKey;
};
