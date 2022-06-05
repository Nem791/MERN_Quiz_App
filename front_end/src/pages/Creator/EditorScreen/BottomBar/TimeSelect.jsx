import { FaCaretDown, FaClock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_TIME_LIMIT } from "../../../../app/creatorSlice/actions";
import { Collapse } from "../../../../components/HiddenSpace";
import { useCollapseCtrl } from "../../../../hooks";
import { Box } from "../../../../styledComponents/Layout";

const timeOptions = [5, 10, 20, 30, 45, 60, 120, 180, 300, 600, 900];

export default function TimeSelect() {
  const [collapsed, setCollapsed, ctrlRef, collapseRef] = useCollapseCtrl();
  const timeLimit = useSelector((state) => state.creator.editor.timeLimit);
  const dispatch = useDispatch();

  return (
    <Box className="btn pos-relative" width="7rem">
      <Collapse className="collapse b-radius-1" open={collapsed}>
        <div className="py-1" ref={collapseRef}>
          {timeOptions.map((sec) => (
            <div
              key={sec}
              className="py-2 collapse-option pointer"
              onClick={() => {
                setCollapsed(false);
                dispatch(CHANGE_TIME_LIMIT(sec));
              }}
            >
              <p className="fw-600">
                {sec < 60 ? sec + " seconds" : sec / 60 + " minutes"}
              </p>
            </div>
          ))}
        </div>
      </Collapse>
      <div
        ref={ctrlRef}
        className="px-2 py-1 full-h flex align-center fw-600 pointer"
      >
        <FaClock className="mr-2" />
        {timeLimit < 60 ? timeLimit + " sec" : timeLimit / 60 + " min"}
        <FaCaretDown className="ml-auto fs-1" />
      </div>
    </Box>
  );
}
