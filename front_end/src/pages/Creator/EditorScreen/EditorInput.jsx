import cn from "classnames";
import { convertToRaw, Editor, EditorState } from "draft-js";
import { useRef, useState } from "react";
import styled from "styled-components";
import { getColor } from "../../../styledComponents/helpers";

export default function EditorInput({ focused, toggleFocus, changeInput }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const ref = useRef();

  const onChange = (newState) => {
    changeInput(convertToRaw(newState.getCurrentContent()).blocks[0].text);
    setEditorState(newState);
  };

  return (
    <StyledEditorInput
      className={cn("p-2 full-w full-h flex-col justify-center", {
        focused,
      })}
      onClick={() => {
        toggleFocus();
        ref.current?.focus();
      }}
    >
      <Editor
        editorState={editorState}
        onChange={onChange}
        onBlur={toggleFocus}
        placeholder="Type an answer option here..."
        ref={ref}
      />
    </StyledEditorInput>
  );
}

const StyledEditorInput = styled.div`
  border-radius: 1rem;
  cursor: text;
  border: 4px solid transparent;
  &.focused {
    border-color: ${getColor("primaryHover")};
    background-color: rgba(0, 0, 0, 0.6);
  }
  .DraftEditor-root {
    position: relative;
  }
  .public-DraftEditorPlaceholder-root {
    position: absolute;
  }
  .public-DraftEditorPlaceholder-inner,
  .DraftEditor-editorContainer {
    color: ${getColor("white1")};
    font-size: 1.5rem;
    text-align: center;
  }
  .public-DraftEditorPlaceholder-inner {
    opacity: 0.7;
  }
`;
