import styled from "styled-components";

export default function BottomBar({ setEditor }) {
  return (
    <StyledBottomBar className="flex justify-between align-center">
      <div>
        <button>More than one correct answer</button>
        <button>30s</button>
      </div>
      <div>
        <button onClick={() => setEditor(false)}>Cancel</button>
        <button>Save</button>
      </div>
    </StyledBottomBar>
  );
}

const StyledBottomBar = styled.div`
  background-color: blue;
  height: 3rem;
`;
