import { FaTimes } from "react-icons/fa";
import styled from "styled-components";

export default function TopBar({ step, point, exit }) {
  return (
    <StyledTopBar className="px-4 pt-1 pb-3 flex justify-between align-center">
      <div className="flex align-center">
        <button className="p-1 mr-3 b-radius-2" onClick={exit}>
          <FaTimes size="1.5rem" color="white" />
        </button>
        <p className="fw-600">Score: {point}</p>
      </div>
      {step >= 0 && <p>Question no. {step + 1}</p>}
    </StyledTopBar>
  );
}

const StyledTopBar = styled.div`
  color: white;
  font-size: 1.25rem;
  button {
    background-color: rgba(255, 255, 255, 0.3);
    &:hover {
      background-color: rgba(255, 255, 255, 0.4);
    }
  }
`;
