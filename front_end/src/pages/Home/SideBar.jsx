import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LOGOUT } from "../../app/userSlice";
import CreateModal from "../../components/CreateModal";
import { SiteLogo } from "../../components/Misc";
import { _SIDEBAR_LINKS } from "../../configs";
import { getColor } from "../../styledComponents/helpers";
import { MainButton } from "../../styledComponents/Inputs";

export default function SideBar({ setSidebarOn }) {
  const [modalOn, setModalOn] = useState(false);
  const userName = useSelector((state) => state.user.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <StyledSideBar className="flex-col">
      <div className="mt-2 ml-3 logo-wrapper">
        <SiteLogo />
      </div>
      <div className="p-4 pb-2">
        <a className="profile-link" href="/profile">
          {userName || "Huan"}
        </a>
      </div>
      <MainButton
        className="create-btn flex"
        onClick={() => {
          setModalOn(true);
          setSidebarOn(false);
        }}
      >
        <AiOutlinePlusCircle className="mr-2" size="1.125rem" />
        Create
      </MainButton>
      <div className="flex-col">
        {_SIDEBAR_LINKS.map(({ Icon, label, path }) => (
          <NavLink key={label} className="link flex align-center" to={path}>
            <Icon className="ml-4 mr-3" /> {label}
          </NavLink>
        ))}
        <p
          className="link flex align-center pointer"
          onClick={() => dispatch(LOGOUT())}
        >
          <FiLogOut className="ml-4 mr-3" />
          Log out
        </p>
      </div>
      {modalOn && (
        <CreateModal
          onSuccess={() => navigate("/creator")}
          close={() => setModalOn(false)}
        />
      )}
    </StyledSideBar>
  );
}

const StyledSideBar = styled.div`
  .logo-wrapper {
    width: 8rem;
    height: 2.5rem;
    img {
      width: 100%;
    }
  }
  .profile-link {
    color: ${getColor("black1")};
    font-weight: 600;
  }
  .create-btn {
    margin: 0 1rem 1.75rem;
    width: 10.5rem;
  }
  .link {
    height: 2.75rem;
    color: ${getColor("text2")};
    &.active,
    &:hover {
      background-color: ${getColor("white2")};
    }
    &.active {
      color: ${getColor("primary")};
      border-right: 4px solid ${getColor("primary")};
    }
  }
`;
