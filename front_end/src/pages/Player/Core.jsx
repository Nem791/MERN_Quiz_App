import cn from "classnames";
import { useEffect, useState } from "react";
import callApi from "../../helpers/callApi";
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
  const [point, setPoint] = useState(0);
  const [chosenOpts, setChosenOpts] = useState([]);
  const [rightOpts, setRightOpts] = useState([]);
  const [questResult, setQuestResult] = useState(null);
  const [selectDone, setSelectDone] = useState(false);
  console.log(chosenOpts);

  const choose = (ansNo) => {
    if (selectDone) return;
    if (currentQuest.type === "multiple_choice_answers") {
      setChosenOpts((prev) => {
        if (prev.includes(ansNo)) {
          return prev.filter((opt) => opt !== ansNo);
        }
        return [...prev, ansNo];
      });
    } else {
    }

    // if (chosenOpts + 1 === numOfRightAns) {
    //   setSelectDone(true);
    //   callApi({
    //     endpoint: "submit/calculate-quiz-score",
    //     method: "POST",
    //     reqData: {
    //       answers: [
    //         {
    //           quiz: setId,
    //           user_answers: chosenOpts.map((no) => answers[no]),
    //         },
    //       ],
    //     },
    //   });
    // }
    // callApi({ }).then(() => setRightAns(index));
  };

  const submit = () => {
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
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        setPoint((prev) => prev + data.score);
        setRightOpts(data.indexOfAnswers);
      })
      .catch(console.log);
  };

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
            step={step}
            question={currentQuest.question}
            answers={currentQuest.options}
            chosenOpts={chosenOpts}
            setChosenOpts={setChosenOpts}
            rightOpts={rightOpts}
            setRightOpts={setRightOpts}
            selectDone={selectDone}
            setSelectDone={setSelectDone}
            setQuestResult={setQuestResult}
            choose={choose}
          />
        </div>
      )}
      <div style={{ height: "88px" }}>
        {questResult !== null && <p>{`${questResult} correct answers`}</p>}
        <button onClick={submit}>Submit</button>
      </div>
    </>
  );
}
