import cn from "classnames";
import { useEffect, useRef, useState } from "react";

export default function Timer({
  questId,
  timeLimit,
  setStep,
  selectDone,
  setQuestResult,
  setSelectDone,
}) {
  const [timer, setTimer] = useState(timeLimit);
  const pct = (timer / timeLimit) * 100;
  const timerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!selectDone) {
        if (timer > 0) {
          setTimer((prev) => prev - 0.01);
        } else {
          setQuestResult(0);
          setSelectDone(true);
          setTimeout(() => {
            setStep((prev) => prev + 1);
            setQuestResult(null);
            setSelectDone(false);
          }, 2000);
          clearInterval(interval);
        }
      } else {
        clearInterval(interval);
      }
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, [timer, setQuestResult, setStep, setTimer, selectDone, setSelectDone]);

  useEffect(() => {
    clearInterval(timerRef.current);
    setTimer(timeLimit);
  }, [questId, timeLimit]);

  return (
    <div className="p-1 full-w">
      <div
        className={cn("timer", { warning: pct < 20 })}
        style={{ maxWidth: pct + "%" }}
      />
    </div>
  );
}
