import cn from "classnames";
import { FaCheck, FaImage, FaTrashAlt } from "react-icons/fa";
import StyledEditorAns from "./Answers.styles";
import Input from "./Input";

export default function EditorAns({
  color,
  correct,
  setThisCorrect,
  warnNoText,
  animation,
  animationDuration,
  deletable,
  deleteThis,
  ...rest
}) {
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
            onClick={deleteThis}
            disabled={!deletable}
          >
            <span className="tooltip">
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
            <span className="tooltip">Change option to image</span>
            <FaImage />
          </button>
        </div>
        <button
          className={cn("ml-auto b-radius-round correct-btn tooltip-wrapper", {
            correct,
          })}
          onClick={setThisCorrect}
        >
          <span className={cn("tooltip", { warnNoText })}>
            {warnNoText ? "Please add text first" : "Mark this answer correct"}
          </span>
          <FaCheck size="0.875rem" />
        </button>
      </div>
      <div className="mt-2 grow-1 custom-sb">
        <Input {...rest} placeholder="Type an answer option here..." />
      </div>
    </StyledEditorAns>
  );
}
