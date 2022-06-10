import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import callApi from "../../helpers/callApi";
import { mausac } from "../../theme";
import Core from "./Core";
import Prepare from "./Prepare";

export default function Player() {
  const [playingSet, setPlayingSet] = useState();
  const [step, setStep] = useState(-1);
  const params = useParams();

  useEffect(() => {
    setTimeout(() => setStep(0), 4000);
    callApi({ endpoint: `quizzes/${params.id}`, method: "GET" })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        // console.log(data);
        setPlayingSet({
          _id: data._id,
          quests: data.quizzes,
        });
      })
      .catch(console.log);
  }, [params.id]);

  const currentQuest = playingSet?.quests[step];
  return (
    <StyledPlayer className="flex-col pos-relative">
      {currentQuest && (
        <Core step={step} setId={playingSet._id} currentQuest={currentQuest} />
      )}
      {step === -1 && <Prepare step={step} />}
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

// {
//   quests: [
//     {
//       question: "What?",
//       answers: ["A", "B", "C", "D"],
//       timeLimit: 30,
//     },
//     {
//       question: "How?",
//       answers: ["1", "2", "3"],
//       timeLimit: 30,
//     },
//   ],
// }
