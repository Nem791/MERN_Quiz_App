import cn from "classnames";
import { ContentState, convertToRaw, Editor, EditorState } from "draft-js";
import { useRef, useState } from "react";
import styled from "styled-components";
import { getColor } from "../../../../styledComponents/helpers";

export default function EditorInput({
  placeholder,
  focused,
  toggleFocus,
  initialInput,
  changeInput,
}) {
  // const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText(initialInput))
  );
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
        onBlur={() => {
          toggleFocus();
          ref.current?.blur();
        }}
        placeholder={placeholder}
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }
  .public-DraftEditorPlaceholder-inner,
  .DraftEditor-editorContainer {
    color: ${getColor("white1")};
    text-align: center;
  }
  .public-DraftEditorPlaceholder-inner {
    opacity: 0.7;
  }
`;
