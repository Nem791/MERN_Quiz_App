import { useEffect, useState } from "react";
import styled from "styled-components";
import { mausac } from "../../theme";
import cn from "classnames";
import { getColor } from "../../styledComponents/helpers";
import callApi from "../../helpers/callApi";

export default function Question({
  question,
  answers,
  questResult,
  setQuestResult,
}) {
  const [chosen, setChosen] = useState(null);
  const [rightAns, setRightAns] = useState(null);
  const [checking, setChecking] = useState(false);
  useEffect(() => {
    //
  }, []);

  const check = (index) => {
    setChosen(index);
    setChecking(true);
    // callApi({ }).then(() => setRightAns(index));
    setTimeout(() => {
      setQuestResult(index === 2);
      setRightAns(2);
      // setChecking(false);
    }, 2000);
  };

  return (
    <StyledQuestion className="p-2 full-w full-h flex-col">
      <div className="p-1 question flex-center">{question}</div>
      <div className="answer-list grow-1 flex">
        {answers.map((ans, i) => (
          <div
            key={i}
            className={cn(
              "p-2 answer flex-center grow-1 full-h b-radius-3 pointer no-" + i,
              { checking },
              i === chosen ? "chosen" : "hidden",
              rightAns && (rightAns === i ? "right" : "wrong")
            )}
            onClick={() => {
              if (!checking) check(i);
            }}
          >
            <p>{ans}</p>
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
    &.checking.chosen:not(.wrong),
    &.right {
      position: relative;
      top: -0.5rem;
      box-shadow: 0 0 0 3px white;
    }
    &.checking.hidden,
    &.hidden.wrong {
      opacity: 0;
      cursor: default;
    }
    &.hidden.right {
      opacity: 1;
    }
    &.right {
      background-color: var(--green) !important;
    }
    &.chosen.wrong {
      background-color: ${getColor("error")};
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
