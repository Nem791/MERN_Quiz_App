import cn from "classnames";
import { useState } from "react";
import styled from "styled-components";
import { getColor } from "../../../styledComponents/helpers";
import EditorAns from "./EditorAns";

export default function Editor() {
  const [quest, setQuest] = useState("");
  const [ans, setAns] = useState(Array(4).fill({ text: "", correct: false }));
  const [focused, setFocused] = useState(null);
  return (
    <StyledEditor className="py-3 full-h b-radius-3">
      <div className="px-3 top-part flex">
        <div style={{ width: "6rem" }}></div>
        <div
          className={cn("question-box grow-1 flex-col justify-center", {
            focused: focused === "Q",
          })}
          onClick={(e) => {
            e.target.firstElementChild.focus();
          }}
        >
          <input
            className="full-w text-center"
            placeholder="Type your question here..."
            value={quest}
            onChange={(e) => setQuest(e.target.value)}
            onFocus={() => setFocused("Q")}
            onBlur={() => setFocused(null)}
          />
        </div>
      </div>
      <div className="bottom-part">
        {ans.map(({ id, ...rest }, i) => (
          <EditorAns key={id || i} {...rest} setAns={setAns} />
        ))}
      </div>
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
      font-size: 20px;
    }
  }
`;
