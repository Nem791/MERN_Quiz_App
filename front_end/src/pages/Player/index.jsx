import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import callApi from "../../helpers/callApi";
import { mausac } from "../../theme";
import Core from "./Core";
import EndScreen from "./EndScreen";
import Prepare from "./Prepare";

export default function Player() {
  const [{ _id, quests }, setPlayingSet] = useState({
    _id: null,
    quests: [],
  });
  const [point, setPoint] = useState(0);
  const [step, setStep] = useState(-1);
  const [userAnswers, setUserAnswers] = useState([]);
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const exit = () => {
    navigate(location.state.root);
  };

  useEffect(() => {
    setTimeout(() => setStep(0), 4000);
    callApi({
      endpoint: `quizzes/${params.id}`,
      method: "GET",
    })
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

  const currentQuest = _id && quests[step];
  const numOfQuests = _id && quests.length;
  return (
    <StyledPlayer className="flex-col pos-relative">
      {currentQuest && (
        <Core
          currentQuest={currentQuest}
          step={step}
          setStep={setStep}
          point={point}
          setPoint={setPoint}
          exit={exit}
          setUserAnswers={setUserAnswers}
        />
      )}
      {numOfQuests && step === numOfQuests && (
        <EndScreen
          setId={_id}
          point={point}
          setStep={setStep}
          setPoint={setPoint}
          exit={exit}
          userAnswers={userAnswers}
          setUserAnswers={setUserAnswers}
        />
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
