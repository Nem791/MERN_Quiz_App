import styled from "styled-components";

const StyledEditorAns = styled.div`
  position: relative;
  background-color: ${(pr) => pr.color};
  &.deleting {
    animation: deleting ${(pr) => pr.duration}ms ease-in-out forwards;
  }
  &.adding {
    animation: adding ${(pr) => pr.duration}ms ease-in-out forwards;
  }
  @keyframes deleting {
    from {
      top: 0;
      opacity: 1;
    }
    to {
      top: 200%;
      opacity: 0;
    }
  }
  @keyframes adding {
    from {
      right: -150%;
      opacity: 0.4;
    }
    to {
      right: 0;
      opacity: 1;
    }
  }
  .util-btn,
  .correct-btn {
    position: relative;
    width: 1.75rem;
    height: 1.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .util-btn {
    border-radius: 0.5rem;
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    &:not(:disabled):hover {
      background-color: rgba(255, 255, 255, 0.33);
    }
  }
  .correct-btn {
    border-radius: 50%;
    border: 2px solid white;
    background-color: rgba(9, 9, 9, 0.5);
    color: rgba(255, 255, 255, 0.5);
    &.correct,
    &:hover {
      color: white;
    }
    &.correct {
      background-color: rgb(0, 201, 133);
    }
    &.multiCorrect {
      border-radius: 0.25rem;
    }
  }
  // inside EditorInput
  .public-DraftEditorPlaceholder-inner,
  .DraftEditor-editorContainer {
    font-size: 1.375rem;
  }
`;

export default StyledEditorAns;
