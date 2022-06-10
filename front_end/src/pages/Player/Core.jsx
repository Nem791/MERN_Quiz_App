import cn from "classnames";
import { useEffect, useState } from "react";
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

export default function Core({ step, setId, currentQuest }) {
  const [questResult, setQuestResult] = useState(null);
  const [point, setPoint] = useState(0);
  return (
    <>
      <div className="p-1 full-w">
        <Timer
          timeLimit={currentQuest.timer || 0}
          setQuestResult={setQuestResult}
        />
      </div>
      <div className="px-2 py-3" style={{ height: "2.5rem" }}></div>
      {step >= 0 && (
        <div className="qna-sec grow-1">
          <Question
            setId={setId}
            step={step}
            question={currentQuest.question}
            answers={currentQuest.options}
            setQuestResult={setQuestResult}
          />
        </div>
      )}
      <div style={{ height: "88px" }}>
        {questResult !== null && <p>{`${questResult} correct answers`}</p>}
      </div>
    </>
  );
}
