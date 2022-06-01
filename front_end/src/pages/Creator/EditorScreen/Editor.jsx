import styled from "styled-components";
import { getColor } from "../../../styledComponents/helpers";

export default function Editor() {
  return (
    <StyledEditor className="p-3 full-h b-radius-3">
      <div className="top-part">
        <div></div>
        <div className="">
          <input />
        </div>
      </div>
      <div className="bottom-part"></div>
    </StyledEditor>
  );
}

const StyledEditor = styled.div`
  background-color: ${getColor("primaryDark")};
`;
