import { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

const StyledHomePage = styled.div`
  .layout {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .content {
    overflow: auto;
  }
`;

export default function HomePage() {
  const [focusing, setFocusing] = useState(false);
  return (
    <StyledHomePage className="flex full-h">
      {focusing && <div className="layout" />}
      <SideBar />
      <div className="flex-col grow-1">
        <TopBar setFocusing={setFocusing} />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </StyledHomePage>
  );
}
