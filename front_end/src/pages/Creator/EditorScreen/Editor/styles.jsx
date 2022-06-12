import styled from "styled-components";
import { getColor } from "../../../../styledComponents/helpers";

export const StyledEditor = styled.div`
  background-color: ${getColor("primaryDark")};
  .top-part {
    height: 45%;
  }
  .question-editor-wrapper {
    // EditorInput
    & > div {
      border: 4px solid transparent;
      &.focused,
      &:hover {
        border-color: ${getColor("primaryHover")};
      }
    }
    // inside EditorInput
    .public-DraftEditorPlaceholder-inner,
    .DraftEditor-editorContainer {
      font-size: 1.5rem;
    }
  }
`;

export const BottomPart = styled.div`
  margin-top: 0.5rem;
  padding: 0 0.75rem;
  height: calc(55% - 0.5rem);
  .add-btn {
    position: absolute;
    top: 50%;
    right: -3rem;
    z-index: 1;
    width: 2.5rem;
    height: 2.5rem;
    transform: translateY(-50%);
  }
  .ans-wrapper > div {
    padding: 6px;
    border-radius: 0.75rem;
  }
  .top-tooltip {
    min-width: 7.5rem;
  }
  .tooltip-wrapper:disabled {
    background-color: rgba(229, 229, 229);
    color: rgba(9, 9, 9, 0.2);
  }
  .tooltip-wrapper:disabled .top-tooltip,
  .top-tooltip.warnNoText {
    background-color: ${getColor("error")};
    &::after {
      border-color: ${getColor("error")} transparent transparent transparent;
    }
  }
`;
