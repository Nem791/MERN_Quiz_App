import cn from "classnames";
import { useEffect, useState } from "react";
import callApi, { handleResponse } from "../../helpers/callApi";
import BottomBar from "./BottomBar";
import Question from "./Question";
import TopBar from "./TopBar";

const Timer = ({ timeLimit, questResult, setQuestResult }) => {
  const [timer, setTimer] = useState(timeLimit);
  const pct = (timer / timeLimit) * 100;

  useEffect(() => {
    if (questResult === null) {
      if (timer > 0) {
        setTimeout(() => setTimer((prev) => prev - 0.01), [10]);
      } else setQuestResult(0);
    }
  }, [timer, setQuestResult, questResult]);

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

export default function Core({ step, setStep, currentQuest }) {
  const [point, setPoint] = useState(0);
  const [chosenOpts, setChosenOpts] = useState([]);
  const [rightOpts, setRightOpts] = useState([]);
  const [questResult, setQuestResult] = useState(null);
  const [selectDone, setSelectDone] = useState(false);

  const choose = (ansNo) => {
    if (selectDone) return;
    switch (currentQuest.type) {
      case "multiple_choice":
        setChosenOpts([ansNo]);
        setSelectDone(true);
        setTimeout(() => submit([ansNo]), 1000);
        break;
      case "multiple_choice_answers":
        setChosenOpts((prev) => {
          if (prev.includes(ansNo)) {
            return prev.filter((opt) => opt !== ansNo);
          }
          return [...prev, ansNo];
        });
        break;
      default:
        return;
    }
  };

  const submit = (chosenOpts) => {
    const reqData = {
      answers: [
        {
          quiz: currentQuest._id,
          user_answers: chosenOpts.map((i) => currentQuest.options[i]),
        },
      ],
    };
    console.log(reqData);
    callApi({
      endpoint: "submit/calculate-quiz-score",
      method: "POST",
      reqData,
      token: localStorage.getItem("token"),
    })
      .then(handleResponse)
      .then((data) => {
        console.log(data);
        setPoint((prev) => prev + data.score);
        setRightOpts(data.indexOfAnswers);
        setQuestResult(
          data.indexOfAnswers.reduce(
            (result, next) => result + (chosenOpts.includes(next) ? 1 : 0),
            0
          )
        );
        setTimeout(() => {
          setChosenOpts([]);
          setRightOpts([]);
          setQuestResult(null);
          setSelectDone(false);
          setStep((prev) => prev + 1);
        }, 2000);
      })
      .catch(console.log);
  };
  return (
    <>
      <div className="p-1 full-w">
        <Timer
          timeLimit={currentQuest.timer || 0}
          questResult={questResult}
          setQuestResult={setQuestResult}
        />
      </div>
      <TopBar point={point} />
      {step >= 0 && (
        <div className="qna-sec grow-1">
          <Question
            step={step}
            question={currentQuest.question}
            answers={currentQuest.options}
            chosenOpts={chosenOpts}
            rightOpts={rightOpts}
            selectDone={selectDone}
            choose={choose}
          />
        </div>
      )}
      <BottomBar questResult={questResult} submit={() => submit(chosenOpts)} />
    </>
  );
}
