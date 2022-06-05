import cn from "classnames";
import { FaCaretDown } from "react-icons/fa";
import styled from "styled-components";
import { Collapse } from "../../../components/HiddenSpace";
import { useCollapseCtrl } from "../../../hooks";
import { getColor } from "../../../styledComponents/helpers";
import { breakpoints } from "../../../theme";

export default function SelectPlace({ searchPlace, setSearchPlace }) {
  const [collapsed, setCollapsed, ctrlRef, collapseRef] = useCollapseCtrl();
  return (
    <StyledSelectPlace className="inherit-br pos-relative">
      <button
        ref={ctrlRef}
        className="p-2 pr-1 inherit-br full-h full-w flex align-center justify-between"
      >
        <span className="mr-2">{searchPlace}</span>
        <FaCaretDown />
      </button>
      <Collapse className="collapse" open={collapsed}>
        <div ref={collapseRef}>
          {["Quizizz library", "My library"].map((opt) => (
            <p
              key={opt}
              className={cn("p-2 pr-1 pointer", {
                active: opt === searchPlace,
              })}
              onClick={() => {
                setCollapsed(null);
                setSearchPlace(opt);
              }}
            >
              {opt}
            </p>
          ))}
        </div>
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
