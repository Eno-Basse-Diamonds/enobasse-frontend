import { useEffect, useState } from "react";

/**
 * Delays value updates until input settles.
 *
 * @description Debounces a value by the specified delay. Returns the latest
 * value only after `delay` ms of inactivity.
 * @param value - The value to debounce
 * @param delay - Debounce delay in milliseconds
 * @returns The debounced value, updated after the delay elapses
 *
 * @example
 * const debouncedSearch = useDebounce(searchTerm, 300);
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
