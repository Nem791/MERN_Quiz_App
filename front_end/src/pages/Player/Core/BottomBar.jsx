import cn from "classnames";
import styled from "styled-components";
import { getColor } from "../../../styledComponents/helpers";
import { MainButton } from "../../../styledComponents/Inputs";

export default function BottomBar({ questType, questResult, submit }) {
  const multipleAns = questType === "multiple_choice_answers";
  return (
    <StyledBottomBar className="p-4 flex align-center pos-relative">
      {questResult !== null && (
        <p
          className={cn(
            "mx-auto quest-result",
            questResult === 0 ? "red" : "green"
          )}
        >
          {`${questResult} correct answer${questResult < 2 ? "" : "s"}`}
        </p>
      )}
      <div className="right-part flex align-center">
        <p className="px-4 rule">
          Select {multipleAns ? "All" : "One"} Correct Answer
          {multipleAns ? "s" : ""}
        </p>
        {multipleAns && <MainButton onClick={submit}>Submit</MainButton>}
      </div>
    </StyledBottomBar>
  );
}

const StyledBottomBar = styled.div`
  height: 88px;
  .quest-result {
    font-size: 1.5rem;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
  }
  .red {
    background-color: ${getColor("error")};
    color: white;
  }
  .green {
    background-color: var(--green);
  }
  .right-part {
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    .rule {
      max-width: 12rem;
      font-size: 1.125rem;
      color: white;
      text-align: right;
      line-height: 1.5;
    }
  }
`;
