import cn from "classnames";
import { FaBars, FaChevronRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SNEAKIN } from "../../app/userSlice";
import { imgLink } from "../../helpers/misc";
import { getColor } from "../../styledComponents/helpers";
import { boxShadows, breakpoints } from "../../theme";
import { LandingButton } from "./styles";

export default function NavBar({ scrolled, setModal }) {
  const notSm = window.innerWidth >= breakpoints.md;
  const dispatch = useDispatch();
  return (
    <StyledNavBar className={cn({ scrolled: !notSm || scrolled })}>
      <div className="nav flex align-center pos-relative">
        <img
          className="mr-3"
          src={imgLink("quizizz_logos/purple-brandmark-600x164")}
          alt=""
          onClick={() => dispatch(SNEAKIN())}
        />
        <ul className="nav-menu flex-center">
          <li>
            <Link to="/forwork">For Work</Link>
          </li>
          <li>
            <Link to="/teachers">For Teachers</Link>
          </li>
          <li>
            <Link to="/schools-and-districts">Schools and District</Link>
          </li>
        </ul>
        <div className="ml-auto flex-center">
          {notSm ? (
            <LandingButton
              className="flex align-center"
              fs="1rem"
              onClick={() => setModal("signup")}
            >
              Sign up <FaChevronRight className="ml-2" />
            </LandingButton>
          ) : (
            <FaBars size="1.5rem" />
          )}
        </div>
      </div>
      <div className="placekeeper mb-4" />
    </StyledNavBar>
  );
}

const StyledNavBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: white;
  &.scrolled {
    background-color: "#EEEEEE";
    box-shadow: ${boxShadows.common};
  }
  img {
    max-width: 110px;
  }
  .nav {
    padding: 10px 16px 12px;
    border-bottom: 1px solid ${getColor("dividerLight")};
  }
  .nav-menu,
  .placekeeper {
    min-width: 100%;
    height: 28px;
  }
  .nav-menu {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    gap: 4px;
    margin-bottom: 0;
    a {
      border-radius: 8px;
      padding: 6px 8px;
      color: black;
      font-size: 0.875rem;
      &:hover {
        background-color: rgba(255, 164, 2, 0.1);
      }
    }
  }
  .content {
    margin-top: 92px;
  }
  @media (min-width: ${breakpoints.md}px) {
    .nav-menu {
      gap: 8px;
      a {
        padding: 8px 12px;
        font-size: 1rem;
      }
    }
  }
  @media (min-width: ${breakpoints.lg}px) {
    .nav {
      padding: 12px 24px 16px;
    }
    .nav-menu {
      gap: 16px;
      position: static;
      min-width: 0;
    }
    .placekeeper {
      display: none;
    }
  }
`;
