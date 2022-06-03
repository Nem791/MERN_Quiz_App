import cn from "classnames";
import { useState } from "react";
import styled from "styled-components";
import { getColor } from "../../../styledComponents/helpers";
import { mausac } from "../../../theme";
import EditorAns from "./EditorAns";
import { Col, Row } from "../../../styledComponents/Layout";

function initAns() {
  let id = Date.now();
  return [...Array(4)].map(() => ({ text: "", id: id++ }));
}

function EditorQuest({ quest, setQuest }) {
  return (
    <div
      className={cn("question-box grow-1 flex-col justify-center", {
        // focused: focused === "Q",
      })}
      onClick={(e) => e.currentTarget.firstElementChild.focus()}
    >
      <input
        className="full-w text-center"
        placeholder="Type your question here..."
        value={quest}
        onChange={(e) => setQuest(e.target.value)}
        // onFocus={() => setFocused("Q")}
        // onBlur={() => setFocused(null)}
      />
    </div>
  );
}

export default function Editor() {
  const [quest, setQuest] = useState("");
  const [ans, setAns] = useState(initAns());
  const [correctId, setCorrectId] = useState(null);
  const [focusId, setFocusId] = useState(null);
  const span = 24 / ans.length;

  return (
    <StyledEditor className="py-3 full-h b-radius-3 flex-col">
      <div className="px-3 top-part flex">
        <div style={{ width: "6rem" }}></div>
        <EditorQuest quest={quest} setQuest={setQuest} />
      </div>
      <BottomPart gap={8}>
        {ans.map(({ id }, i) => (
          <Col key={id} span={span} className="bottom-part-col">
            <EditorAns
              correct={correctId === id}
              setThisCorrect={() => setCorrectId(id)}
              changeInput={(input) =>
                setAns((prev) => {
                  const newAns = [...prev];
                  newAns[i].text = input;
                  return newAns;
                })
              }
              focused={focusId === id}
              toggleFocus={() =>
                setFocusId((prev) => (prev === id ? null : id))
              }
            />
          </Col>
        ))}
      </BottomPart>
    </StyledEditor>
  );
}

const StyledEditor = styled.div`
  background-color: ${getColor("primaryDark")};
  .top-part {
    height: 45%;
  }
  .question-box {
    border: 4px solid transparent;
    border-radius: 1rem;
    cursor: text;
    &.focused {
      background-color: ${getColor("primaryDarker")};
    }
    &.focused,
    &:hover {
      border-color: ${getColor("primaryHover")};
    }
    input {
      background-color: inherit;
      color: ${getColor("white1")};
      font-size: 1.5rem;
      &::placeholder {
        color: ${getColor("white1")};
        opacity: 0.7;
      }
    }
  }
`;

const BottomPart = styled(Row)`
  margin-top: 0.5rem;
  padding: 0 0.75rem;
  height: calc(55% - 0.5rem);
  .bottom-part-col > div {
    padding: 6px;
    border-radius: 0.75rem;
  }
  .bottom-part-col:nth-child(1) > div {
    background-color: ${mausac.xanhbien};
  }
  .bottom-part-col:nth-child(2) > div {
    background-color: ${mausac.xanhngoc};
  }
  .bottom-part-col:nth-child(3) > div {
    background-color: ${mausac.vang};
  }
  .bottom-part-col:nth-child(4) > div {
    background-color: ${mausac.dohong};
  }
  .bottom-part-col:nth-child(5) > div {
    background-color: ${mausac.timnhat};
  }
`;
