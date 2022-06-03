import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Col, Row } from "../../../../styledComponents/Layout";
import Answers from "./Answers";
import Input from "./Input";
import { BottomPart, StyledEditor } from "./styles";

const colors = ["xanhbien", "xanhngoc", "vang", "dohong", "timnhat"];

function initAns() {
  let id = Date.now();
  return [...Array(4)].map((_, i) => ({
    text: "",
    id: id++,
    color: colors[i],
  }));
}

const animationDuration = 300;

export default function Editor() {
  const [quest, setQuest] = useState("");
  const [ans, setAns] = useState(initAns());
  const [correctId, setCorrectId] = useState(null);
  const [focusId, setFocusId] = useState(null);
  const [warnNoTextIds, setWarnNoTextIds] = useState([]);
  const [animation, setAnimation] = useState([null, -1]);
  const [ansCount, setAnsCount] = useState(4);

  useEffect(() => {
    if (warnNoTextIds.length) {
      const first = warnNoTextIds[0];
      setTimeout(() => {
        setWarnNoTextIds((prev) => {
          const newIds = [...prev];
          const index = newIds.indexOf(first);
          if (index !== -1) newIds.splice(index, 1);
          return newIds;
        });
      }, 2000);
    }
  }, [warnNoTextIds]);

  const deleteAnswer = (id) => {
    if (ansCount > 2) {
      setAnsCount((prev) => prev - 1);
      setAnimation(["deleting", id]);
      setTimeout(() => {
        setAns((prev) => {
          const newAns = [...prev];
          newAns.splice(
            newAns.findIndex((A) => A.id === id),
            1
          );
          return newAns;
        });
        setAnimation([null, -1]);
      }, animationDuration);
    }
  };

  const addAnswer = () => {
    if (ansCount < 5) {
      const id = Date.now();
      setAnsCount((prev) => prev + 1);
      setAnimation(["adding", id]);
      setAns((prev) => {
        let color = colors[4];
        const existed = prev.map((A) => A.color);
        for (const C of colors) {
          if (!existed.includes(C)) {
            color = C;
          }
        }
        return [...prev, { text: "", id, color }];
      });
      setTimeout(() => {
        setAnimation([null, -1]);
      }, animationDuration);
    }
  };

  const answerSpan = 24 / ans.length;
  return (
    <StyledEditor className="py-3 full-h b-radius-3 flex-col">
      <div className="px-3 top-part flex">
        <div style={{ width: "6rem" }}></div>
        <div
          className="question-editor-wrapper grow-1"
          onClick={(e) => e.currentTarget.firstElementChild.focus()}
        >
          <Input
            placeholder="Type your question here..."
            focused={focusId === -1}
            toggleFocus={() => setFocusId((prev) => (prev === -1 ? null : -1))}
            changeInput={setQuest}
          />
        </div>
      </div>
      <BottomPart className="pos-relative">
        <button
          className="add-btn flex-center b-radius-round tooltip-wrapper"
          onClick={addAnswer}
          disabled={ansCount === 5}
        >
          <span className="tooltip">
            {ansCount < 5
              ? "Add an option"
              : "You cannot have more than 5 options"}
          </span>
          <FaPlus font-size="1rem" />
        </button>
        <Row className="full-h" gap={8}>
          {ans.map(({ text, id, color }, i) => (
            <Col key={id} span={answerSpan} className="ans-wrapper">
              <Answers
                color={color}
                correct={correctId === id}
                setThisCorrect={() => {
                  if (text) setCorrectId(id);
                  else setWarnNoTextIds((prev) => [...prev, id]);
                }}
                changeInput={(input) => {
                  setAns((prev) => {
                    const newAns = [...prev];
                    newAns[i].text = input;
                    return newAns;
                  });
                  if (!input && correctId === id) setCorrectId(null);
                }}
                focused={focusId === id}
                toggleFocus={() =>
                  setFocusId((prev) => (prev === id ? null : id))
                }
                warnNoText={warnNoTextIds.includes(id)}
                animation={animation[1] === id && animation[0]}
                animationDuration={animationDuration}
                deletable={ansCount > 2}
                deleteThis={() => deleteAnswer(id)}
              />
            </Col>
          ))}
        </Row>
      </BottomPart>
    </StyledEditor>
  );
}
