import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  ADDED_ANSWER,
  EDIT_ANSWER,
  EDIT_QUESTION,
} from "../../../../app/creatorSlice";
import { Col, Row } from "../../../../styledComponents/Layout";
import Answers from "./Answers";
import Input from "./Input";
import { BottomPart, StyledEditor } from "./styles";

export default function Editor() {
  const answerIds = useSelector((state) => state.creator.editor.allAnswerIds);
  const [focusId, setFocusId] = useState(null);
  const dispatch = useDispatch();

  const answerSpan = 24 / answerIds.length;
  return (
    <StyledEditor className="py-3 full-h b-radius-3 flex-col">
      <div className="px-3 top-part flex">
        <div style={{ width: "6rem" }}></div>
        <div className="question-editor-wrapper grow-1">
          <Input
            placeholder="Type your question here..."
            focused={focusId === -1}
            toggleFocus={() => setFocusId((prev) => (prev === -1 ? null : -1))}
            changeInput={(text) => dispatch(EDIT_QUESTION(text))}
          />
        </div>
      </div>
      <BottomPart className="pos-relative">
        <button
          className="add-btn flex-center b-radius-round tooltip-wrapper"
          onClick={() => dispatch(ADDED_ANSWER())}
          disabled={answerIds.length === 5}
        >
          <span className="tooltip">
            {answerIds.length < 5
              ? "Add an option"
              : "You cannot have more than 5 options"}
          </span>
          <FaPlus size="1rem" />
        </button>
        <Row className="full-h" gap={8}>
          {answerIds.map((id) => (
            <Col key={id} span={answerSpan} className="ans-wrapper">
              <Answers
                id={id}
                deletable={answerIds.length > 2}
                input={
                  <Input
                    changeInput={(text) => dispatch(EDIT_ANSWER({ id, text }))}
                    focused={focusId === id}
                    toggleFocus={() =>
                      setFocusId((prev) => (prev === id ? null : id))
                    }
                    placeholder="Type an answer option here..."
                  />
                }
              />
            </Col>
          ))}
        </Row>
      </BottomPart>
    </StyledEditor>
  );
}
