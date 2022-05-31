import { useState } from "react";
import { FaBars, FaRegBell } from "react-icons/fa";
import styled from "styled-components";
import { getColor } from "../../../styledComponents/helpers";
import { boxShadows, breakpoints } from "../../../theme";
import SearchBox from "./SearchBox";
import SelectPlace from "./SelectPlace";

export default function TopBar({ setFocusing, setSidebarOn }) {
  const [searchPlace, setSearchPlace] = useState("Quizizz library");
  const [collapse, setCollapse] = useState(null);
  return (
    <StyledTopBar className="full-w flex">
      <div
        className="bars-btn flex-center pr-2 pointer"
        onClick={() => setSidebarOn(true)}
      >
        <FaBars size="1.25rem" />
      </div>
      <div className="search-bar flex grow-1">
        <SearchBox
          collapse={collapse}
          setCollapse={setCollapse}
          setFocusing={setFocusing}
        />
        <div className="divider my-2" />
        <SelectPlace
          collapse={collapse}
          setCollapse={setCollapse}
          searchPlace={searchPlace}
          setSearchPlace={setSearchPlace}
        />
      </div>
      <button className="notif-btn ml-4 flex-center">
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
    border-radius: 0.5rem;
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
    .divider {
      width: 1px;
      background: ${getColor("dividerLight")};
    }
    .notif-btn {
      display: block;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      background-color: ${getColor("white2")};
    }
  }
`;
