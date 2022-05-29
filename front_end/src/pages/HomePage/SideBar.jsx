import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaMapMarkedAlt, FaRegFolder, FaRegUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineCog } from "react-icons/hi";
import { VscLibrary } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { getColor } from "../../styledComponents/helpers";
import { MainButton } from "../../styledComponents/Inputs";

const links = [
  { Icon: FaMapMarkedAlt, label: "Explore", path: "/" },
  { Icon: VscLibrary, label: "My library", path: "private" },
  { Icon: HiOutlineCog, label: "Settings", path: "settings" },
  { Icon: FaRegFolder, label: "Collections", path: "profile/collections" },
  { Icon: FaRegUserCircle, label: "Profile", path: "profile" },
];

export default function SideBar() {
  return (
    <StyledSideBar className="flex-col">
      <div className="mt-2 ml-3 logo-wrapper">
        <img
          src="https://cf.quizizz.com/img/quizizz_logos/purple-brandmark-600x164.png"
          alt=""
        />
      </div>
      <div className="p-4 pb-2">
        <a className="profile-link" href="/profile">
          Ronqueroc
        </a>
      </div>
      <MainButton className="create-btn flex">
        <AiOutlinePlusCircle className="mr-2" size="1.125rem" />
        Create
      </MainButton>
      <div className="flex-col">
        {links.map(({ Icon, label, path }) => (
          <NavLink key={label} className="link flex align-center" to={path}>
            <Icon className="ml-4 mr-3" /> {label}
          </NavLink>
        ))}
        <p className="link flex align-center pointer">
          <FiLogOut className="ml-4 mr-3" />
          Log out
        </p>
      </div>
    </StyledSideBar>
  );
}

const StyledSideBar = styled.div`
  min-width: 200px;
  background-color: ${getColor("white1")};
  filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.05))
    drop-shadow(0 2px 4px rgba(0, 0, 0, 0.08));
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
    margin: 0 auto 1.75rem;
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
