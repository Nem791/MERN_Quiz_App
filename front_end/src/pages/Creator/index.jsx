import cn from "classnames";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { OutOfScreen } from "../../components/HiddenSpace";
import { getColor } from "../../styledComponents/helpers";
import { boxShadows, breakpoints } from "../../theme";
import EditorScreen from "./EditorScreen";
import Manager from "./Manager";
import QuestList from "./QuestList";
import QuestTypeBoard from "./QuestTypeBoard";
import ToolBar from "./Toolbar";
import TopBar from "./TopBar";

export default function Creator() {
  const questType = useSelector((state) => state.creator.editor.questType);
  const numOfQuests = useSelector(
    (state) => state.creator.savedQuests.allIds.length
  );
  const [img, setImg] = useState(null);

  return (
    <StyledCreator className="b-radius-1">
      <div className="creator-topbar">
        <TopBar />
      </div>
      <div className="creator-inner flex justify-center">
        <div className="left-sec px-2 flex-col align-center pos-relative">
          <div
            className={cn("creator-toolbar full-w", { "d-none": !numOfQuests })}
          >
            <ToolBar />
          </div>
          <div className="creator-quest-area">
            {numOfQuests ? (
              <QuestList />
            ) : (
              <>
                <p className="mb-4 fw-600 text-center">Create a new question</p>
                <QuestTypeBoard />
              </>
            )}
          </div>
        </div>
        <div className="right-sec">
          <Manager img={img} setImg={setImg} />
        </div>
        <OutOfScreen
          className="editor-screen-animation"
          active={questType}
          posOut={{ top: "100%", left: 0, right: 0, zIndex: 3 }}
          posIn={{ top: "var(--topbar-height)" }}
          moveTime={300}
          // unmountWhenOut
        >
          <EditorScreen />
        </OutOfScreen>
      </div>
    </StyledCreator>
  );
}

const StyledCreator = styled.div`
  --topbar-height: 3rem;
  .std-btn {
    display: flex;
    align-items: center;
    border-radius: 0.25rem;
    padding: 4px 16px;
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.5rem;
  }
  .creator-topbar {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
  }
  .creator-inner {
    min-height: calc(100vh - var(--topbar-height));
    padding-top: var(--topbar-height);
  }
  .creator-toolbar {
    position: fixed;
    top: var(--topbar-height);
    z-index: 1;
  }
  .creator-toolbar,
  .left-sec {
    max-width: 40rem;
  }
  .left-sec {
    width: 100%;
  }
  .left-sec-children {
    border: 1px solid rgb(229, 229, 229);
    box-shadow: ${boxShadows.common};
    border-radius: 0.5rem;
    background-color: ${getColor("white1")};
  }
  .creator-quest-area {
    padding-top: 8.5rem;
  }
  .right-sec {
    display: none;
    position: sticky;
    top: var(--topbar-height);
    padding: 1.5rem 0 0 1.5rem;
    width: 24rem;
    height: calc(100vh - var(--topbar-height));
  }
  .editor-screen-animation {
    height: calc(100vh - var(--topbar-height));
  }
  @media (min-width: ${breakpoints.lg}px) {
    .right-sec {
      display: block;
    }
  }
`;
