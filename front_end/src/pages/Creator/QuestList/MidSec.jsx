import { Box, Col, Row, StackDivider } from "../../../styledComponents/Layout";
import { mausac } from "../../../theme";

export default function MidSec({ question, answers }) {
  return (
    <div className="flex-col">
      <p className="mb-4">Q. {question}</p>
      <StackDivider className="mb-4 pos-relative" bgColor="rgb(229, 229, 229)">
        <p className="px-2 py-1 ans-choice-divider pos-absolute fs-075">
          answer choices
        </p>
      </StackDivider>
      <Row className="mb-2" gap={[8, 8]}>
        {answers.map(({ text, correct }, i) => (
          <Col key={i} span={12}>
            <div className="full-h full-w flex align-center">
              <Box
                className="full-h mr-2 b-radius-round"
                width="1rem"
                height="1rem"
                bgColor={correct ? mausac.xanhladam : mausac.do}
              />
              <span className="lh-15">{text}</span>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
