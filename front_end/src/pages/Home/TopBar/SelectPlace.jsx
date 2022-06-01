import cn from "classnames";
import { useEffect, useRef } from "react";
import { FaCaretDown } from "react-icons/fa";
import styled from "styled-components";
import { Collapse } from "../../../components/HiddenSpace";
import { getColor } from "../../../styledComponents/helpers";
import { breakpoints } from "../../../theme";

export default function SelectPlace({
  collapse,
  setCollapse,
  searchPlace,
  setSearchPlace
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
    <StyledSelectPlace className="inherit-br pos-relative">
      <button
        ref={ref1}
        className="p-2 pr-1 inherit-br full-h full-w flex align-center justify-between"
      >
        <span className="mr-2">{searchPlace}</span>
        <FaCaretDown />
      </button>
      <Collapse className="collapse" open={collapse === "place"}>
        {["Quizizz library", "My library"].map((opt) => (
          <p
            key={opt}
            ref={ref2}
            className={cn("p-2 pr-1 pointer", {
              active: opt === searchPlace
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
    </StyledSelectPlace>
  );
}

const StyledSelectPlace = styled.div`
  display: none;
  min-width: 130px;
  button {
    font-size: 0.875rem;
  }
  .collapse {
    position: absolute;
    top: 100%;
    background: ${getColor("white1")};
    border-radius: 0 0 5px 5px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    p:not(:last-child) {
      border-bottom: 1px solid ${getColor("dividerLight")};
    }
    p:last-child {
      border-radius: inherit;
    }
    p:hover {
      background: ${getColor("white2")};
    }
    p.active {
      color: ${getColor("primary")};
      background-color: ${getColor("primaryLight")};
    }
  }
  @media (min-width: ${breakpoints.lg}px) {
    display: block;
  }
`;
