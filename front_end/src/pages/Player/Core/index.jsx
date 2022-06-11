import { useState } from "react";
import callApi, { handleResponse } from "../../../helpers/callApi";
import Question from "./Question";
import BottomBar from "./BottomBar";
import Timer from "./Timer";
import TopBar from "./TopBar";

export default function Core({
  step,
  setStep,
  point,
  setPoint,
  currentQuest,
  exit,
  setUserAnswers,
}) {
  const [chosenOpts, setChosenOpts] = useState([]);
  const [rightOpts, setRightOpts] = useState([]);
  const [questResult, setQuestResult] = useState(null);
  const [selectDone, setSelectDone] = useState(false);

  const choose = (ansNo) => {
    if (selectDone) return;
    switch (currentQuest.type) {
      case "multiple_choice": {
        setChosenOpts([ansNo]);
        setSelectDone(true);
        setTimeout(() => submit([ansNo]), 1000);
        break;
      }
      case "multiple_choice_answers": {
        setChosenOpts((prev) => {
          if (prev.includes(ansNo)) {
            return prev.filter((opt) => opt !== ansNo);
          }
          return [...prev, ansNo];
        });
        break;
      }
      default:
        return;
    }
  };

  const submit = (chosenOpts, markDone) => {
    if (markDone) {
      setSelectDone(true);
    }
    const reqData = {
      answers: [
        {
          quiz: currentQuest._id,
          user_answers: chosenOpts.map((i) => currentQuest.options[i]),
        },
      ],
    };
    // console.log(reqData);
    callApi({
      endpoint: "submit/calculate-quiz-score",
      method: "POST",
      reqData,
      token: localStorage.getItem("token"),
    })
      .then(handleResponse)
      .then((data) => {
        // console.log(data);
        setPoint((prev) => prev + data.score);
        setRightOpts(data.indexOfAnswers);
        setQuestResult(
          data.indexOfAnswers.reduce(
            (result, next) => result + (chosenOpts.includes(next) ? 1 : 0),
            0
          )
        );
        setUserAnswers((prev) => [...prev, data.user_answers]);
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
      <Timer
        questId={currentQuest._id}
        timeLimit={currentQuest.timer || 0}
        selectDone={selectDone}
        setStep={setStep}
        setQuestResult={setQuestResult}
        setSelectDone={setSelectDone}
      />
      <TopBar step={step} point={point} exit={exit} />
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
      <BottomBar
        questType={currentQuest.type}
        questResult={questResult}
        submit={() => submit(chosenOpts, true)}
      />
    </>
  );
}
