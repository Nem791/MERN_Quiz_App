import cn from "classnames";
import styled from "styled-components";
import { getColor } from "../../../styledComponents/helpers";
import { mausac } from "../../../theme";

export default function Question({
  question,
  answers,
  chosenOpts,
  rightOpts,
  selectDone,
  choose,
}) {
  return (
    <StyledQuestion className="p-2 full-w full-h flex-col">
      <div className="p-1 question flex-center">{question}</div>
      <div className="answer-list grow-1 flex">
        {answers.map((ans, i) => (
          <div
            key={i}
            className={cn(
              "p-4 answer flex-center grow-1 full-h b-radius-3 pointer no-" + i,
              "w-" + 100 / answers.length,
              { selectDone },
              chosenOpts.includes(i) ? "chosen" : "hidden",
              !!rightOpts.length && (rightOpts.includes(i) ? "right" : "wrong")
            )}
            onClick={() => choose(i)}
          >
            <p className="text-center">{ans}</p>
          </div>
        ))}
      </div>
    </StyledQuestion>
  );
}

const StyledQuestion = styled.div`
  border-radius: 16px;
  background-color: ${getColor("primaryDark")};
  .question {
    height: 242px;
    font-size: 1.5rem;
    color: white;
  }
  .answer-list {
    gap: 8px;
  }
  .answer {
    font-size: 1.5rem;
    color: white;
    transition: all 300ms linear;
    &.w-20 {
      width: 50%;
    }
    &.w-25 {
      width: 25%;
    }
    &.w-33 {
      width: 33.333%;
    }
    &.w-50 {
      width: 50%;
    }
    &.selectDone {
      cursor: default;
    }
    &.chosen:not(.wrong),
    &.right {
      position: relative;
      top: -0.5rem;
      box-shadow: 0 0 0 3px white;
    }
    &.right {
      background-color: var(--green) !important;
      color: black;
    }
    &.chosen.wrong {
      background-color: ${getColor("error")} !important;
    }
    &.hidden.wrong {
      opacity: 0;
    }
    &.no-0 {
      background-color: ${mausac.xanhbien};
    }
    &.no-1 {
      background-color: ${mausac.xanhngoc};
    }
    &.no-2 {
      background-color: ${mausac.vang};
    }
    &.no-3 {
      background-color: ${mausac.dohong};
    }
    &.no-4 {
      background-color: ${mausac.timnhat};
    }
    &:hover {
      filter: brightness(1.1);
    }
  }
`;
