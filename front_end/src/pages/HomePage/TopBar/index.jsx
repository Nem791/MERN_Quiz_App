import { useState } from "react";
import { FaRegBell } from "react-icons/fa";
import SearchBox from "./SearchBox";
import SelectPlace from "./SelectPlace";
import StyledTopBar from "./styles";

export default function TopBar({ setFocusing }) {
  const [searchPlace, setSearchPlace] = useState("Quizizz library");
  const [collapse, setCollapse] = useState(null);
  return (
    <StyledTopBar className="full-w flex">
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
        <FaRegBell />
      </button>
    </StyledTopBar>
  );
}
