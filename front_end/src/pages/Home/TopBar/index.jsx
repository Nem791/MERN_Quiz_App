import { useState } from "react";
import { FaBars, FaRegBell } from "react-icons/fa";
import styled from "styled-components";
import { getColor } from "../../../styledComponents/helpers";
import { LineDivider } from "../../../styledComponents/Layout";
import { boxShadows, breakpoints } from "../../../theme";
import SearchBox from "./SearchBox";
import SelectPlace from "./SelectPlace";

export default function TopBar({ setFocusing, setSidebarOn }) {
  const [searchPlace, setSearchPlace] = useState("Quizizz library");
  return (
    <StyledTopBar className="full-w flex">
      <div
        className="bars-btn flex-center pr-2 pointer"
        onClick={() => setSidebarOn(true)}
      >
        <FaBars size="1.25rem" />
      </div>
      <div className="search-bar b-radius-3 flex grow-1">
        <SearchBox setFocusing={setFocusing} />
        <LineDivider className="my-2" height="auto" />
        <SelectPlace
          searchPlace={searchPlace}
          setSearchPlace={setSearchPlace}
        />
      </div>
      <button className="ml-4 notif-btn b-radius-round flex-center">
        <FaRegBell size="1.125rem" />
      </button>
    </StyledTopBar>
  );
}

const StyledTopBar = styled.div`
  height: 56px;
  padding: 8px;
  border-left: 2px solid ${getColor("white2")};
  background-color: ${getColor("white1")};
  box-shadow: ${boxShadows.common};
  z-index: 2;
  .search-bar {
    background-color: ${getColor("white2")};
    .inherit-br {
      border-radius: inherit;
    }
  }
  .notif-btn {
    display: none;
  }
  @media (min-width: ${breakpoints.lg}px) {
    .bars-btn {
      display: none;
    }
    .notif-btn {
      display: flex;
      width: 2.5rem;
      height: 2.5rem;
      background-color: ${getColor("white2")};
    }
  }
`;
