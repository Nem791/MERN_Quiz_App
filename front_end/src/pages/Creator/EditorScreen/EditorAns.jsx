import styled from "styled-components";
import { FaTrash, FaImage, FaCheck } from "react-icons/fa";
import EditorInput from "./EditorInput";
import cn from "classnames";

export default function EditorAns({ correct, setThisCorrect, ...rest }) {
  return (
    <StyledEditorAns className="full-w full-h flex-col">
      <div className="flex">
        <div className="flex">
          <button className="mr-2 util-btn">
            <FaTrash />
          </button>
          <button className="util-btn">
            <FaImage />
          </button>
        </div>
        <button
          className={cn("ml-auto b-radius-round correct-btn", {
            correct,
          })}
          onClick={setThisCorrect}
        >
          <FaCheck size="0.875rem" />
        </button>
      </div>
      <div className="mt-2 grow-1 custom-sb">
        <EditorInput {...rest} />
      </div>
    </StyledEditorAns>
  );
}

const StyledEditorAns = styled.div`
  .util-btn,
  .correct-btn {
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
    &:hover {
      background-color: rgba(255, 255, 255, 0.33);
    }
  }
  .correct-btn {
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
  }
  // inside EditorInput
  .public-DraftEditorPlaceholder-inner,
  .DraftEditor-editorContainer {
    font-size: 1.375rem;
  }
`;
