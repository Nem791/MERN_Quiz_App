import { createSelector } from "@reduxjs/toolkit";
import cn from "classnames";
import { FaCheck, FaImage, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  CHOOSE_ANSWER_CORRECT,
  DELETED_ANSWER,
  DELETING_ANSWER,
  EDIT_ANSWER,
  STOP_WARNING,
  WARN_NO_TEXT,
} from "../../../../app/creatorSlice/actions";
import StyledEditorAns from "./Answers.styles";
import Input from "./Input";

const selectAnswerById = createSelector(
  (state) => state.creator.editor.answersById,
  (_, id) => id,
  (answersById, id) => answersById[id]
);

const animationDuration = 300;

export default function Answers({ id, deletable, focused, setFocusId }) {
  const answerInfo = useSelector((state) => selectAnswerById(state, id));
  const multiCorrect = useSelector(
    (state) => state.creator.editor.multiCorrect
  );
  const dispatch = useDispatch();
  if (!answerInfo) return null;

  const { text, color, correct, warnNoText, animation } = answerInfo;
  return (
    <StyledEditorAns
      color={color}
      duration={animationDuration}
      className={cn("full-w full-h flex-col", animation)}
    >
      <div className="flex">
        <div className="flex">
          <button
            className="mr-2 util-btn tooltip-wrapper"
            onClick={() => {
              dispatch(DELETING_ANSWER(id));
              setTimeout(() => {
                dispatch(DELETED_ANSWER(id));
              }, animationDuration);
            }}
            disabled={!deletable}
          >
            <span className="tooltip top-tooltip">
              {deletable
                ? "Delete option"
                : "You cannot have less than 2 options"}
            </span>
            <FaTrashAlt />
          </button>
          <button
            className="util-btn tooltip-wrapper"
            data-tooltip="Change option to image"
          >
            <span className="tooltip top-tooltip">Change option to image</span>
            <FaImage />
          </button>
        </div>
        <button
          className={cn("ml-auto correct-btn tooltip-wrapper", {
            correct,
            multiCorrect,
          })}
          onClick={() => {
            if (text === "") {
              if (!warnNoText) {
                dispatch(WARN_NO_TEXT(id));
                setTimeout(() => {
                  dispatch(STOP_WARNING(id));
                }, 2000);
              }
            } else {
              dispatch(CHOOSE_ANSWER_CORRECT(id));
            }
          }}
        >
          <span className={cn("tooltip top-tooltip", { warnNoText })}>
            {warnNoText ? "Please add text first" : "Mark this answer correct"}
          </span>
          <FaCheck size="0.875rem" />
        </button>
      </div>
      <div className="mt-2 grow-1 custom-sb">
        <Input
          placeholder="Type an answer option here..."
          focused={focused}
          toggleFocus={() => setFocusId((prev) => (prev === id ? null : id))}
          initialInput={text}
          changeInput={(text) => dispatch(EDIT_ANSWER({ id, text }))}
        />
      </div>
    </StyledEditorAns>
  );
}
