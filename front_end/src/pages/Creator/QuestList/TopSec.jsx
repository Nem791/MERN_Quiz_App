import { FaRegCopy, FaRegTrashAlt, FaSort } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { DUPLICATE_QUEST, EDIT_QUEST } from "../../../app/creatorSlice/actions";
import { DELETE_QUEST } from "../../../app/creatorSlice/thunks";
import { _QUEST_TYPE_RENDER_INFOS } from "../../../configs";
import { Box, Col, Row } from "../../../styledComponents/Layout";

export default function TopSec({ id, index, questType }) {
  const dispatch = useDispatch();
  const { Icon, bgColor } = _QUEST_TYPE_RENDER_INFOS.find(
    ({ text }) => text === questType
  );
  return (
    <Row className="align-center" gap={8}>
      <Col>
        <button className="tooltip-wrapper">
          <span className="tooltip top-tooltip">Re-order</span>
          <FaSort size="1rem" />
        </button>
      </Col>
      <Col>
        <Box className="p-1" bgColor={bgColor} borderRadius="2px">
          <Icon color="white" />
        </Box>
      </Col>
      <Col>
        <span>Question {index + 1}</span>
      </Col>
      <Col className="ml-auto">
        <button
          className="tooltip-wrapper"
          onClick={() => dispatch(EDIT_QUEST(id))}
        >
          <span className="tooltip top-tooltip">Edit</span>
          <MdEdit size="1rem" />
        </button>
      </Col>
      <Col>
        <button
          className="tooltip-wrapper"
          onClick={() => dispatch(DUPLICATE_QUEST(id))}
        >
          <span className="tooltip top-tooltip">Duplicate</span>
          <FaRegCopy size="0.875rem" />
        </button>
      </Col>
      <Col>
        <button
          className="tooltip-wrapper"
          onClick={() => dispatch(DELETE_QUEST(id))}
        >
          <span className="tooltip top-tooltip">Delete</span>
          <FaRegTrashAlt size="0.875rem" />
        </button>
      </Col>
    </Row>
  );
}
