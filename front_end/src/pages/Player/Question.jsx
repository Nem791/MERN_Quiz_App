import { useEffect, useState } from "react";
import styled from "styled-components";
import { mausac } from "../../theme";
import cn from "classnames";
import { getColor } from "../../styledComponents/helpers";
import callApi from "../../helpers/callApi";

const numOfRightAns = 2;

export default function Question({
  setId,
  step,
  question,
  answers,
  setQuestResult,
}) {
  const [chosenOpts, setChosenOpts] = useState([]);
  const [rightOpts, setRightOpts] = useState([]);
  const [selectDone, setSelectDone] = useState(false);
  useEffect(() => {
    //
  }, []);

  const choose = (ansNo) => {
    if (selectDone) return;
    setChosenOpts((prev) => {
      if (prev.includes(ansNo)) {
        return prev.filter((opt) => opt !== ansNo);
      }
      return [...prev, ansNo];
    });
    if (chosenOpts + 1 === numOfRightAns) {
      setSelectDone(true);
      callApi({
        endpoint: "",
        reqData: {
          answers: [
            {
              quiz: setId,
              user_answers: chosenOpts.map((no) => answers[no]),
            },
          ],
        },
      });

      // setTimeout(() => {
      //   let numOfCorrect = 0;
      //   const rightIndexes = [2, 3];
      //   for (const opt of chosenOpts) {
      //     if (rightIndexes.includes(opt)) {
      //       numOfCorrect++;
      //     }
      //   }
      //   setQuestResult(numOfCorrect);
      //   setRightOpts(rightIndexes);
      // }, 2000);
    }
    // callApi({ }).then(() => setRightAns(index));
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
              { selectDone },
              chosenOpts.includes(i) ? "chosen" : "hidden",
              !!rightOpts.length && (rightOpts.includes(i) ? "right" : "wrong")
            )}
            onClick={() => choose(i)}
          >
            <p>{ans}</p>
          </div>
        ))}
      </div>
      <div className="intro-layout pos-fixed full-stretch flex-center">
        <p>{step + 1}</p>
      </div>
    </StyledQuestion>
  );
}

const StyledQuestion = styled.div`
  border-radius: 16px;
  background-color: ${getColor("primaryDark")};
  .intro-layout {
    background-color: black;
    color: white;
    font-size: 10rem;
    animation: fading 400ms linear forwards;
    pointer-events: none;
  }
  @keyframes fading {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
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
    &.selectDone.chosen:not(.wrong),
    &.right {
      position: relative;
      top: -0.5rem;
      box-shadow: 0 0 0 3px white;
    }
    &.selectDone.hidden,
    &.hidden.wrong {
      opacity: 0;
      cursor: default;
    }
    &.hidden.right {
      opacity: 1;
    }
    &.right {
      background-color: var(--green) !important;
      color: black;
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
