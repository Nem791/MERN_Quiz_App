import { useEffect } from "react";
import styled from "styled-components";
import callApi from "../../helpers/callApi";
import { Button, MainButton } from "../../styledComponents/Inputs";

export default function EndScreen({
  point,
  setId,
  // setStep,
  // setPoint,
  exit,
  userAnswers,
  // setUserAnswers,
}) {
  console.log(setId);
  useEffect(() => {
    callApi({
      endpoint: "submit/save-history",
      method: "POST",
      token: localStorage.getItem("token"),
      reqData: {
        score: point,
        quiz_set_id: setId,
        user_answers: userAnswers,
      },
    });
  }, []);
  return (
    <StyledEndScreen className="mx-auto my-auto p-4 flex-col flex-center">
      <p className="title text-center">You have finished all questions!</p>
      <p className="mt-5 fw-600">Final Score</p>
      <div className="mt-3 p-4 score b-radius-3 fw-600 flex-center">
        <p>{point}</p>
      </div>
      <div className="mt-5 flex">
        <Button className="mr-4" bgColor="error" color="white1" onClick={exit}>
          Exit
        </Button>
        {/* <MainButton
          onClick={() => {
            setStep(-1);
            setPoint(0);
            setUserAnswers([]);
            setTimeout(() => setStep(0), 4000);
          }}
        >
          Play again
        </MainButton> */}
      </div>
    </StyledEndScreen>
  );
}

const StyledEndScreen = styled.div`
  width: 100vw;
  max-width: 300px;
  height: 60vh;
  border-radius: 1rem;
  background-color: white;
  font-size: 1.25rem;
  .title {
    font-size: 2rem;
  }
  .score {
    width: 8rem;
    height: 8rem;
    background-color: var(--green);
    font-size: 4rem;
  }
`;
