import { useSelector } from "react-redux";
import styled from "styled-components";
import { OutOfScreen } from "../../components/HiddenSpace";
import { breakpoints } from "../../theme";
import EditorScreen from "./EditorScreen";
import Manager from "./Manager";
import QuestList from "./QuestList";
import QuizOptions from "./QuizOptions";
import TopBar from "./TopBar";

export default function Creator() {
  const questType = useSelector((state) => state.creator.editor.questType);
  const numOfQuests = useSelector(
    (state) => state.creator.savedQuests.allIds.length
  );
  return (
    <StyledCreator className="b-radius-1">
      <div className="creator-topbar">
        <TopBar />
      </div>
      <div className="creator-inner flex justify-center relative">
        <div className="left-sec px-2 flex-col align-center">
          {numOfQuests ? (
            <QuestList />
          ) : (
            <>
              <p className="mb-4 fw-600">Create a new question</p>
              <QuizOptions />
            </>
          )}
        </div>
        <div className="right-sec">
          <Manager />
        </div>
        <OutOfScreen
          className="editor-screen-animation"
          active={questType}
          posOut={{ top: "100%", left: 0, right: 0 }}
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
  .left-sec {
    max-width: 40rem;
    margin-top: 8.5rem;
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
