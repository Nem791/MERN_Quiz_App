import { useDispatch } from "react-redux";
import { OPEN_EDITOR } from "../../app/creatorSlice/actions";
import { _QUEST_TYPE_RENDER_INFOS } from "../../configs";
import { Box, Row } from "../../styledComponents/Layout";

export default function ToolBar() {
  const dispatch = useDispatch();
  return (
    <div className="p-4 left-sec-children flex justify-center">
      <Row gap={12}>
        {_QUEST_TYPE_RENDER_INFOS.map(({ Icon, text, bgColor }) => (
          <div key={text}>
            <Box
              className="flex-center b-radius-1 pointer pos-relative tooltip-wrapper"
              width="3rem"
              height="3rem"
              bgColor={bgColor}
              onClick={() => dispatch(OPEN_EDITOR(text))}
            >
              <Box
                className="px-2 tooltip btm-tooltip fs-075 text-center"
                width="300%"
              >
                Add {text} question
              </Box>
              <Icon size="1.5rem" color="white" />
            </Box>
          </div>
        ))}
      </Row>
    </div>
  );
}
