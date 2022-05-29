import { useEffect, useRef, useState } from "react";

export function useGetHeight() {
  const [height, setHeight] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentBoxSize) {
          const contentBoxSize = Array.isArray(entry.contentBoxSize)
            ? entry.contentBoxSize[0]
            : entry.contentBoxSize;
          setHeight(contentBoxSize.blockSize);
        } else {
          setHeight(entry.contentRect.height);
        }
      }
    });
    const elmt = ref.current;
    resizeObserver.observe(elmt);
    return () => resizeObserver.unobserve(elmt);
  }, []);
  return [ref, Math.ceil(height)];
}

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
