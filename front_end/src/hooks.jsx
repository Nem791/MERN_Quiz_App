import { useEffect, useRef, useState } from "react";

export function useGetHeight() {
  const ref = useRef();
  const [height, setHeight] = useState(0);
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

export function useCollapseCtrl() {
  const [collapsed, setCollapsed] = useState(false);
  const ctrlRef = useRef();
  const collapseRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (collapseRef.current && !collapseRef.current.contains(e.target)) {
        if (!ctrlRef.current) return;
        if (ctrlRef.current.contains(e.target)) {
          setCollapsed((prev) => !prev);
        } else {
          setCollapsed(false);
        }
      }
    };
    window.addEventListener("click", handleClick, true);
    return () => window.removeEventListener("click", handleClick, true);
  }, [setCollapsed]);

  return [collapsed, setCollapsed, ctrlRef, collapseRef];
}
