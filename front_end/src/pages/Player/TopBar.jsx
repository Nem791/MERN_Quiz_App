import styled from "styled-components";

export default function TopBar({ point }) {
  return (
    <StyledTopBar className="px-4 py-2">
      <p className="fw-600">Score: {point}</p>
    </StyledTopBar>
  );
}

const StyledTopBar = styled.div`
  height: 2.5rem;
  color: white;
  font-size: 1.25rem;
`;
