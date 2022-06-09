import cn from "classnames";
import { FaCaretDown, FaClock } from "react-icons/fa";
import { useCollapseCtrl } from "../../hooks";
import { Box } from "../../styledComponents/Layout";
import { Collapse } from "../../components/HiddenSpace";

const timeOptions = [5, 10, 20, 30, 45, 60, 120, 180, 300, 600, 900];

export default function TimeSelect({
  btnCn,
  collapseInnerCn,
  short,
  timeLimit,
  setTimeLimit,
}) {
  const [collapsed, setCollapsed, ctrlRef, collapseRef] = useCollapseCtrl();
  return (
    <Box
      className="btn pos-relative tooltip-wrapper"
      width={short ? "7rem" : "9rem"}
    >
      <Box
        className={cn("tooltip top-tooltip text-center", {
          "d-none": collapsed,
        })}
        width="140%"
      >
        Time limit to answer this question
      </Box>
      <Collapse className="collapse b-radius-1" open={collapsed}>
        <div className={cn("py-1", collapseInnerCn)} ref={collapseRef}>
          {timeOptions.map((time) => (
            <div
              key={time}
              className="py-2 collapse-option pointer"
              onClick={() => {
                setCollapsed(false);
                setTimeLimit(time);
              }}
            >
              <p className="fw-600">
                {time < 60 ? time + " seconds" : time / 60 + " minutes"}
              </p>
            </div>
          ))}
        </div>
      </Collapse>
      <div
        ref={ctrlRef}
        className={cn("px-2 py-1 flex align-center pointer", btnCn)}
      >
        <FaClock className="mr-2" />
        {timeLimit < 60
          ? cn(timeLimit, short ? "sec" : "seconds")
          : cn(timeLimit / 60, short ? "min" : "minutes")}
        <FaCaretDown className="ml-auto fs-1" />
      </div>
    </Box>
  );
}
