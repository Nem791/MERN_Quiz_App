import { FaCloudUploadAlt, FaCog } from "react-icons/fa";
import { IoPlay } from "react-icons/io5";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LineDivider } from "../../styledComponents/Layout";
import { imgLink } from "../../helpers/misc";
import { getColor } from "../../styledComponents/helpers";
import { breakpoints } from "../../theme";

export default function TopBar() {
  const buttons = [
    { Icon: IoPlay, text: "Preview" },
    { Icon: FaCog, text: "Settings" },
    { Icon: FaCloudUploadAlt, text: "Save" },
  ];
  return (
    <CreatorTopBar className="p-2 flex align-center justify-between">
      <Link to="/">
        <img src={imgLink("quizizz_logos/white-brandmark-600x164")} alt="" />
      </Link>
      <LineDivider
        className="mx-2"
        width="2px"
        bgColor="rgba(255, 255, 255, 0.1)"
      />
      <div className="ml-auto flex">
        {buttons.map(({ Icon, text }, i) => (
          <button key={i} className="ml-2 std-btn">
            <Icon className="mr-1" size="1rem" />
            {text}
          </button>
        ))}
      </div>
    </CreatorTopBar>
  );
}

const CreatorTopBar = styled.div`
  background-color: ${getColor("primaryDark")};
  height: var(--topbar-height);
  img {
    width: 4.5rem;
    height: auto;
  }
  button:first-child {
    display: none;
  }
  button:not(:last-child) {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    &:hover {
      background: rgba(255, 255, 255, 0.33);
    }
  }
  @media (min-width: ${breakpoints.lg}px) {
    button:first-child {
      display: block;
    }
  }
`;
