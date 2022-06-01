import { getColor } from "../../styledComponents/helpers";
import cn from "classnames";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function useSlideCtrl() {
  const [scrollPos, setScrollPos] = useState(0);
  const [atFarRight, setAtFarRight] = useState(false);
  const wrapperRef = useRef();

  useEffect(() => {
    const slider = wrapperRef.current;
    const updatePos = (e) => setScrollPos(e.target.scrollLeft);
    if (slider) {
      slider.addEventListener("scroll", updatePos);
    }
    return () => {
      if (slider) slider.removeEventListener("scroll", updatePos);
    };
  }, []);

  useEffect(() => {
    setAtFarRight(
      wrapperRef.current?.scrollWidth -
        (wrapperRef.current?.clientWidth + scrollPos) <
        1
    );
  }, [scrollPos]);

  const scroll = (dir) => () => {
    if (wrapperRef.current) {
      const scrollDistance = wrapperRef.current?.clientWidth || 0;
      wrapperRef.current.scrollLeft +=
        dir === "left" ? -scrollDistance : scrollDistance;
    }
  };

  const controllers = ["left", "right"].map((dir) => {
    const Icon = dir === "left" ? FaChevronLeft : FaChevronRight;
    return (
      <StyledChevronWrapper
        key={dir}
        className={cn("chevron-wrapper pointer", dir, {
          "d-none": dir === "left" ? !scrollPos : atFarRight
        })}
        onClick={scroll(dir)}
      >
        <div className="chevron-bg pos-absolute full-stretch" />
        <div className="chevron-icon p-2 flex-center absolute-center">
          <Icon size="1.25rem" />
        </div>
      </StyledChevronWrapper>
    );
  });
  return [wrapperRef, controllers];
}

const StyledChevronWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  &.right {
    right: -4px;
  }
  &.left {
    left: -4px;
  }
  .chevron-bg {
    background-color: ${getColor("black1")};
    opacity: 0.15;
  }
`;
