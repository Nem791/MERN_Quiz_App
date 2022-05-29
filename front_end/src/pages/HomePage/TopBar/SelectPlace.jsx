import cn from "classnames";
import { useEffect, useRef } from "react";
import { FaCaretDown } from "react-icons/fa";
import { Collapse } from "../../../components/HiddenSpace";

export default function SelectPlace({
  collapse,
  setCollapse,
  searchPlace,
  setSearchPlace,
}) {
  const ref1 = useRef();
  const ref2 = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref2.current && !ref2.current.contains(e.target)) {
        if (!ref1.current) return;
        if (ref1.current.contains(e.target)) {
          setCollapse((prev) =>
            prev === "place" ? null : prev === null ? "place" : prev
          );
        } else {
          setCollapse((prev) => (prev === "place" ? null : prev));
        }
      }
    };
    window.addEventListener("click", handleClick, true);
    return () => window.removeEventListener("click", handleClick, true);
  }, [setCollapse]);

  return (
    <div className="inherit-br relative">
      <button
        ref={ref1}
        className="p-2 pr-1 inherit-br full-h full-w flex align-center justify-between"
      >
        <span className="mr-2">{searchPlace}</span>
        <FaCaretDown />
      </button>
      <Collapse className="library-dropdown" open={collapse === "place"}>
        {["Quizizz library", "My library"].map((opt) => (
          <p
            key={opt}
            ref={ref2}
            className={cn("p-2 pr-1 pointer", {
              active: opt === searchPlace,
            })}
            onClick={() => {
              setCollapse(null);
              setSearchPlace(opt);
            }}
          >
            {opt}
          </p>
        ))}
      </Collapse>
    </div>
  );
}
