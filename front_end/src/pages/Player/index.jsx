import cn from "classnames";
import { useCallback, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import styled from "styled-components";
import callApi from "../../helpers/callApi";
import { mausac } from "../../theme";
import Prepare from "./Prepare";
import Question from "./Question";

const Timer = ({ timeLimit, setQuestResult }) => {
  const [timer, setTimer] = useState(timeLimit);
  const pct = (timer / timeLimit) * 100;

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => setTimer((prev) => prev - 0.01), [10]);
    } else setQuestResult(false);
  }, [timer, setQuestResult]);

  useEffect(() => {
    setTimer(timeLimit);
  }, [timeLimit]);

  return (
    <div
      className={cn("timer", { warning: pct < 25 })}
      style={{ maxWidth: pct + "%" }}
    />
  );
};

export default function Player() {
  const [playingSet, setPlayingSet] = useState({
    quests: [
      {
        question: "What?",
        answers: ["A", "B", "C", "D"],
        timeLimit: 30,
      },
      {
        question: "How?",
        answers: ["1", "2", "3"],
        timeLimit: 30,
      },
    ],
  });
  const [step, setStep] = useState(-1);
  const [questResult, setQuestResult] = useState(false);
  const [point, setPoint] = useState(0);
  const currentQuest = playingSet.quests[step];
  // const params = useParams();

  useEffect(() => {
    setTimeout(() => setStep(0), 4000);
    // callApi({ endpoint: "", method: "POST", reqData: {} });
  }, []);

  return (
    <StyledPlayer className="flex-col pos-relative">
      <div className="p-1 full-w">
        <Timer
          timeLimit={currentQuest?.timeLimit || 0}
          setQuestResult={setQuestResult}
        />
      </div>
      <div className="px-2 py-3" style={{ height: "2.5rem" }}></div>
      {step >= 0 && (
        <div className="qna-sec grow-1">
          <Question
            question={currentQuest.question}
            answers={currentQuest.answers}
            questResult={questResult}
            setQuestResult={setQuestResult}
          />
        </div>
      )}
      <div style={{ height: "88px" }}>{questResult}</div>
      {step === -1 && <Prepare />}
    </StyledPlayer>
  );
}

const StyledPlayer = styled.div`
  --green: #62f98e;
  width: 100vw;
  height: 100vh;
  background-color: black;
  .timer {
    border-radius: 2px;
    height: 6px;
    background-color: var(--green);
    &.warning {
      background-color: ${mausac.do};
    }
  }
  .qna-sec {
    padding: 0 8px 8px;
  }
`;
