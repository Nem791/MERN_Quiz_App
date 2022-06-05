import cn from "classnames";
import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  CLOSE_EDITOR,
  SAVE_QUEST,
  TOGGLE_MULTI_CORRECT_ANSWERS,
} from "../../../../app/creatorSlice/actions";
import { _QUEST_TYPES } from "../../../../configs";
import { getColor } from "../../../../styledComponents/helpers";
import TimeSelect from "./TimeSelect";
import TypeSelect from "./TypeSelect";

export default function BottomBar() {
  const questType = useSelector((state) => state.creator.editor.questType);
  const multiCorrect = useSelector(
    (state) => state.creator.editor.multiCorrect
  );
  const dispatch = useDispatch();
  return (
    <StyledBottomBar className="mt-2 flex justify-between">
      <TypeSelect />
      {questType === _QUEST_TYPES.multipleChoice && (
        <div
          className="p-3 pr-4 switcher-wrapper btn flex pointer"
          onClick={() => dispatch(TOGGLE_MULTI_CORRECT_ANSWERS())}
        >
          <div
            className={cn("mr-2 switcher pos-relative", {
              "switcher-on": multiCorrect,
            })}
          />
          <span>More than one correct answer</span>
        </div>
      )}
      <TimeSelect />
      <button
        className="ml-auto px-4 py-1 btn"
        onClick={() => dispatch(CLOSE_EDITOR())}
      >
        Cancel
      </button>
      <SaveButton />
    </StyledBottomBar>
  );
}

function isSavable(question, answers) {
  if (question === "") return false;
  let hasCorrect = false;
  for (const answer of answers) {
    if (answer.text === "") return false;
    if (answer.correct) hasCorrect = true;
  }
  return hasCorrect;
}

function SaveButton() {
  const { question, answersById } = useSelector(
    (state) => state.creator.editor
  );
  const [shaking, setShaking] = useState(false);
  const dispatch = useDispatch();
  const savable = isSavable(question, Object.values(answersById));

  return (
    <button
      className={cn("px-4 py-1 btn flex align-center pos-relative", {
        shaking,
        disabled: !savable,
      })}
      onClick={() => {
        if (savable) {
          dispatch(SAVE_QUEST());
        } else {
          setShaking(true);
          setTimeout(() => setShaking(false), 500);
        }
      }}
    >
      <FaSave className="mr-2" />
      Save
    </button>
  );
}

const StyledBottomBar = styled.div`
  height: 2.25rem;
  gap: 0.5rem;
  .btn {
    border-radius: 0.25rem;
    background-color: rgba(9, 9, 9, 0.5);
    color: white;
    font-size: 0.875rem;
    &.disabled {
      background-color: #e5e5e5;
      color: rgba(9, 9, 9, 0.2);
    }
  }
  .collapse {
    position: absolute;
    bottom: 100%;
    left: 0;
    right: 0;
    background-color: white;
  }
  .collapse-option {
    padding: 6px 12px;
    &:hover {
      background-color: rgba(9, 9, 9, 0.1);
    }
    p {
      color: ${getColor("text2")};
    }
  }
  .switcher-wrapper {
    width: 16rem;
  }
  .switcher {
    border-radius: 100px;
    background-color: #ccc;
    height: 100%;
    aspect-ratio: 2 / 1;
    transition: 0.4s;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      width: 50%;
      height: 100%;
      border-radius: 50%;
      background-color: white;
      transition: 0.4s;
    }
    &.switcher-on {
      background-color: #2196f3;
      ::before {
        transform: translateX(100%);
      }
    }
  }
  .shaking {
    animation: shaking 100ms linear infinite;
  }
  @keyframes shaking {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-5%);
    }
    to {
      transform: translateX(5%);
    }
  }
`;
