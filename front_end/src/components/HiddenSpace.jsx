import cn from "classnames";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useGetHeight } from "../hooks";

const StyledDiv = styled.div`
  height: 0;
  overflow: hidden;
  transition: ${(props) => props.transition};
  &.open {
    height: ${(props) => props.openHeight};
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
