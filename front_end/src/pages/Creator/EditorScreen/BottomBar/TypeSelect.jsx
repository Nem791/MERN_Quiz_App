import { FaCaretDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_EDITOR } from "../../../../app/creatorSlice/actions";
import { Collapse } from "../../../../components/HiddenSpace";
import { _QUEST_TYPE_RENDER_INFOS } from "../../../../configs";
import { useCollapseCtrl } from "../../../../hooks";
import { Box } from "../../../../styledComponents/Layout";

export default function TypeSelect() {
  const [collapsed, setCollapsed, ctrlRef, collapseRef] = useCollapseCtrl();
  const questType = useSelector((state) => state.creator.editor.questType);
  const dispatch = useDispatch();
  if (!questType) return null;

  const { Icon, text, bgColor } = _QUEST_TYPE_RENDER_INFOS.find(
    (type) => type.text === questType
  );
  return (
    <Box className="btn pos-relative" width="13rem">
      <Collapse className="collapse b-radius-1" open={collapsed}>
        <div className="py-1" ref={collapseRef}>
          {_QUEST_TYPE_RENDER_INFOS.map(({ Icon, text, bgColor }) => (
            <div
              key={text}
              className="collapse-option flex align-center pointer"
              onClick={() => {
                setCollapsed(false);
                dispatch(OPEN_EDITOR(text));
              }}
            >
              <Box className="p-1 mr-2" bgColor={bgColor} borderRadius="2px">
                <Icon />
              </Box>
              <p className="fw-600">{text}</p>
            </div>
          ))}
        </div>
      </Collapse>
      <div
        ref={ctrlRef}
        className="p-2 full-h flex align-center fw-600 fs-075 pointer"
      >
        <Box className="p-1 mr-2" bgColor={bgColor} borderRadius="2px">
          <Icon />
        </Box>
        {text}
        <FaCaretDown className="ml-auto fs-1" />
      </div>
    </Box>
  );
}
