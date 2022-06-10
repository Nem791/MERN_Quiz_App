import cn from "classnames";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
// import { useDevActions } from "../../hooks";
import { getColor } from "../../styledComponents/helpers";
import { breakpoints } from "../../theme";
import PreviewModal from "./PreviewModal";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

export default function HomePage() {
  const [focusing, setFocusing] = useState(false);
  const [sidebarOn, setSidebarOn] = useState(false);
  const previewing = useSelector((state) => state.ui.previewedSet.title.length);
  // useDevActions();

  return (
    <StyledHomePage className="full-w full-w flex">
      {(focusing || sidebarOn) && (
        <div
          className={"layout " + (sidebarOn ? "lv2" : "lv1")}
          onClick={() => setSidebarOn(false)}
        />
      )}
      <div className={cn("left-sec", { "slided-in": sidebarOn })}>
        <SideBar setSidebarOn={setSidebarOn} />
      </div>
      <div className="right-sec flex-col">
        <TopBar setFocusing={setFocusing} setSidebarOn={setSidebarOn} />
        <div className="custom-sb">
          <Outlet />
        </div>
      </div>
      {previewing ? <PreviewModal /> : null}
    </StyledHomePage>
  );
}

const StyledHomePage = styled.div`
  height: 100vh;
  .layout {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .layout.lv1 {
    z-index: 1;
  }
  .layout.lv2 {
    z-index: 3;
  }
  & > .left-sec {
    width: 200px;
    height: 100vh;
    position: absolute;
    top: 0;
    left: -200px;
    z-index: 4;
    background-color: ${getColor("white1")};
    transition: all 250ms ease-in-out;
  }
  & > .left-sec.slided-in {
    left: 0;
  }
  & > .right-sec {
    width: 100vw;
  }
  @media (min-width: ${breakpoints.lg}px) {
    & > .left-sec {
      position: static;
      z-index: 0;
      filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.05))
        drop-shadow(0 2px 4px rgba(0, 0, 0, 0.08));
    }
    & > .right-sec {
      width: calc(100vw - 200px);
    }
  }
`;
