import cn from "classnames";
import styled from "styled-components";
import { getColor } from "../../styledComponents/helpers";
import { MainButton } from "../../styledComponents/Inputs";

export default function BottomBar({ questResult, submit }) {
  return (
    <StyledBottomBar className="p-4 flex align-center pos-relative">
      {questResult !== null && (
        <p
          className={cn("mx-auto", questResult === 0 ? "red" : "green")}
        >{`${questResult} correct answers`}</p>
      )}
      <MainButton className="pos-absolute" onClick={submit}>
        Submit
      </MainButton>
    </StyledBottomBar>
  );
}

const StyledBottomBar = styled.div`
  height: 88px;
  p {
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
  button {
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
  }
`;
