import { useDispatch } from "react-redux";
import styled from "styled-components";
import { OPEN_EDITOR } from "../../app/creatorSlice/actions";
import { _QUEST_TYPE_RENDER_INFOS } from "../../configs";
import { Col, Row } from "../../styledComponents/Layout";

export default function QuestTypeBoard() {
  const dispatch = useDispatch();
  return (
    <StyledQuestTypeBoard className="p-4 left-sec-children">
      <Row className="board-inner" gap={[16, 16]}>
        {_QUEST_TYPE_RENDER_INFOS.map(({ Icon, text, bgColor }, i) => (
          <Col key={i} span={8}>
            <div
              className="p-2 option b-radius-3 flex-col align-center pointer"
              onClick={() => dispatch(OPEN_EDITOR(text))}
            >
              <IconWrapper
                className="mb-3 b-radius-1 flex-center"
                bgColor={bgColor}
              >
                <Icon />
              </IconWrapper>
              <span className="fw-600">{text}</span>
            </div>
          </Col>
        ))}
      </Row>
    </StyledQuestTypeBoard>
  );
}

const StyledQuestTypeBoard = styled.div`
  width: 400px;
  max-width: 100vw;
  .option {
    &:hover {
      background-color: rgba(9, 9, 9, 0.05);
    }
    span {
      font-size: 0.75rem;
    }
  }
`;

const IconWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: ${(pr) => pr.bgColor};
  color: white;
  font-size: 1.25rem;
`;
