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
  --tooltip-bg: rgb(25, 25, 25);
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
  .tooltip {
    bottom: calc(100% + 6px);
    min-width: 120px;
    background-color: var(--tooltip-bg);
    color: white;
    transform-origin: center bottom;
    cursor: default;
    line-height: 1.4;
    &::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-style: solid;
      border-width: 5px;
      border-color: var(--tooltip-bg) transparent transparent transparent;
    }
  }
  .tooltip-wrapper:disabled .tooltip,
  .tooltip.warnNoText {
    background-color: ${getColor("error")};
    &::after {
      border-color: ${getColor("error")} transparent transparent transparent;
    }
  }
  .tooltip.warnNoText {
    transform: scale(1);
  }
`;
