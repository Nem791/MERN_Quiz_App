import styled from "styled-components";
import BottomBar from "./BottomBar";
import Editor from "./Editor";
import Toolbar from "./Toolbar";
import { breakpoints } from "../../../theme";
import { getColor } from "../../../styledComponents/helpers";

export default function EditorScreen() {
  return (
    <StyledEditorScreen className="full-w full-h flex-col">
      <Toolbar />
      <div className="grow-1 flex justify-center">
        <div className="p-3 editor-sec full-h flex-col">
          <div className="grow-1">
            <Editor />
          </div>
          <BottomBar />
        </div>
      </div>
    </StyledEditorScreen>
  );
}

const StyledEditorScreen = styled.div`
  background-color: ${getColor("text2")};
  @media (min-width: ${breakpoints.lg}px) {
    .editor-sec {
      width: 920px;
    }
  }
`;
