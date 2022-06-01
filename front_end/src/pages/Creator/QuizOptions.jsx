import styled from "styled-components";
import { QUIZ_TYPES } from "../../configs";
import { getColor } from "../../styledComponents/helpers";
import { Col, Row } from "../../styledComponents/Layout";
import { boxShadows } from "../../theme";

export default function QuizOptions({ setEditor }) {
  return (
    <StyledQuizOptions className="p-4 b-radius-3">
      <Row className="board-inner" gap={[16, 16]}>
        {QUIZ_TYPES.map(({ Icon, text, bgColor }, i) => (
          <Col key={i} span={8}>
            <div
              className="p-2 option b-radius-3 flex-col align-center pointer"
              onClick={() => setEditor(text)}
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
    </StyledQuizOptions>
  );
}

const StyledQuizOptions = styled.div`
  width: 400px;
  max-width: 100vw;
  box-shadow: ${boxShadows.emerge};
  background-color: ${getColor("white1")};
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
