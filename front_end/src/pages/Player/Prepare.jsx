import { useEffect, useState } from "react";
import cn from "classnames";
import styled from "styled-components";
import { getColor } from "../../styledComponents/helpers";

const goWord = "Go!";

export default function Prepare() {
  const [expand, setExpand] = useState(false);
  const [queue, setQueue] = useState([3]);

  useEffect(() => setExpand(true), []);

  useEffect(() => {
    let unmount = false;
    setTimeout(() => {
      if (!unmount) {
        setQueue((prev) => {
          const last = prev[prev.length - 1];
          if (last === goWord) return prev;
          return [...prev, last === 1 ? goWord : last - 1];
        });
      }
    }, 1000);
    return () => {
      unmount = true;
    };
  }, [queue]);

  return (
    <StyledPrepare className="flex-col justify-center pos-relative pos-fixed full-stretch">
      <div className={cn("layout", { expand })} />
      {queue.map((elmt) => (
        <div key={elmt} className={cn("ribbon", { final: elmt === goWord })} />
      ))}
      {queue.map((elmt) => (
        <p key={elmt} className={cn("count", { final: elmt === goWord })}>
          {elmt}
        </p>
      ))}
    </StyledPrepare>
  );
}

const StyledPrepare = styled.div`
  --duration: 550ms;
  --animation-info: ease-out 400ms 2 alternate;
  z-index: 1;
  background-color: ${getColor("primaryDark")};
  .layout {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    height: 0;
    transition: height 350ms linear;
    background-color: rgba(0, 0, 0, 0.3);
    &.expand {
      height: 100vh;
    }
  }
  .ribbon {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    z-index: 2;
    transform: translateY(-50%);
    background-color: black;
    &:not(.final) {
      animation: stretch var(--duration) var(--animation-info);
    }
    &.final {
      animation: final-stretch 800ms ease-out forwards;
    }
  }
  @keyframes stretch {
    0% {
      height: 0;
      opacity: 0;
    }
    1% {
      height: 150px;
      opacity: 1;
    }
    100% {
      height: 300px;
    }
  }
  @keyframes final-stretch {
    0% {
      height: 0;
      opacity: 0;
    }
    1% {
      height: 150px;
      opacity: 1;
    }
    60% {
      height: 315px;
    }
    70% {
      height: 280px;
    }
    80% {
      height: 305px;
    }
    90% {
      height: 295px;
    }
    100% {
      height: 300px;
    }
  }
  .count {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 3;
    transform: translate(-50%, -50%) scale(0);
    font-size: 10rem;
    font-weight: 700;
    color: white;
    &:not(.final) {
      animation: expanding var(--duration) var(--animation-info);
    }
    &.final {
      animation: final-expanding 800ms ease-out forwards;
    }
  }
  @keyframes expanding {
    0% {
      opacity: 0;
    }
    1% {
      transform: translate(-50%, -50%) scale(0.3);
      opacity: 0.2;
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }
  @keyframes final-expanding {
    0% {
      opacity: 0;
    }
    1% {
      transform: translate(-50%, -50%) scale(0.3);
      opacity: 0.2;
    }
    60% {
      transform: translate(-50%, -50%) scale(1.15);
      opacity: 1;
    }
    70% {
      transform: translate(-50%, -50%) scale(0.85);
    }
    80% {
      transform: translate(-50%, -50%) scale(1.05);
    }
    90% {
      transform: translate(-50%, -50%) scale(0.95);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;
