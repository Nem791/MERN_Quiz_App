import { useState } from "react";
import styled from "styled-components";
import LeftSec from "./LeftSec";
import { _LIBRARY_NAMES } from "../../configs";
import RightSec from "./RightSec";

export default function MyLibrary() {
  const [library, setLibrary] = useState(_LIBRARY_NAMES[0]);
  return (
    <StyleLibrary>
      <div className="full-w flex inner">
        <div className="left-sec">
          <LeftSec library={library} setLibrary={setLibrary} />
        </div>
        <div className="right-sec">
          <RightSec library={library} />
        </div>
      </div>
    </StyleLibrary>
  );
}

const StyleLibrary = styled.div`
  padding: 24px 32px 24px 0;
  .inner {
    justify-content: center;
  }
  .left-sec {
    width: 20%;
    margin-right: 1.5rem;
  }
  .right-sec {
    width: calc(100% / 3 * 2);
  }
`;
