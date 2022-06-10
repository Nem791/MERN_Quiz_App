import cn from "classnames";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useGetHeight } from "../hooks";

const StyledDiv = styled.div`
  height: 0;
  overflow: hidden;
  transition: ${(pr) => pr.transition};
  &.open {
    height: ${(pr) => pr.openHeight};
  }
`;

export function HiddenScroll(props) {
  const { on, className, duration } = props;
  const [open, setOpen] = useState(false);
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    if (on) {
      setOpen(true);
      setShowing(true);
    } else {
      setOpen(false);
      setTimeout(() => setShowing(false), duration);
    }
  }, [on]);

  return (
    <StyledDiv
      className={cn(className, { open })}
      openHeight={props.openHeight}
      transition={`height ${duration}ms ${props.timingFunc}`}
      style={props.style}
    >
      {showing && props.children}
    </StyledDiv>
  );
}

export function Collapse({ className, open, children }) {
  const [ref, height] = useGetHeight();
  return (
    <StyledDiv
      className={cn("hide-sb", className, { open })}
      transition={`height ${Math.max(
        Math.min(Math.round(height) / 2, 300),
        150
      )}ms ease-in-out`}
      openHeight={height + "px"}
    >
      <div ref={ref}>{children}</div>
    </StyledDiv>
  );
}

export function OutOfScreen({
  active,
  moveTime = 200,
  unmountWhenOut,
  children,
  className,
  ...rest
}) {
  const [mounted, setMounted] = useState(!unmountWhenOut);

  useEffect(() => {
    if (unmountWhenOut) {
      if (active) {
        setMounted(true);
      } else {
        setTimeout(() => setMounted(false), moveTime);
      }
    }
  }, [unmountWhenOut, active, moveTime]);

  return (
    <StyledOutOfScreen
      className={cn(className, { "slide-in": active })}
      moveTime={moveTime}
      {...rest}
    >
      {mounted && children}
    </StyledOutOfScreen>
  );
}

const StyledOutOfScreen = styled.div`
  position: fixed;
  top: ${(pr) => pr.posOut.top};
  bottom: ${(pr) => pr.posOut.bottom};
  left: ${(pr) => pr.posOut.left};
  right: ${(pr) => pr.posOut.right};
  z-index: ${(pr) => pr.posOut.zIndex};
  width: ${(pr) => pr.width};
  height: ${(pr) => pr.height};
  opacity: 0.4;
  transition: all ${(pr) => pr.moveTime}ms ease;
  &.slide-in {
    top: ${(pr) => pr.posIn.top};
    bottom: ${(pr) => pr.posIn.bottom};
    left: ${(pr) => pr.posIn.left};
    right: ${(pr) => pr.posIn.right};
    opacity: 1;
  }
`;
