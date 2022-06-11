import cn from "classnames";
import { FaCloudUploadAlt, FaCog, FaTrashAlt } from "react-icons/fa";
import { IoPlay } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LineDivider } from "../../styledComponents/Layout";
import { imgLink } from "../../helpers/misc";
import { getColor } from "../../styledComponents/helpers";
import { breakpoints } from "../../theme";
import { useDispatch } from "react-redux";
import { CLOSE_CREATOR, SAVE } from "../../app/creatorSlice/thunks";

export default function TopBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const buttons = [
    { Icon: IoPlay, text: "Preview" },
    { Icon: FaCog, text: "Settings" },
    {
      Icon: FaTrashAlt,
      text: "Discard",
      className: "out-creator",
      onClick: () => {
        dispatch(CLOSE_CREATOR(() => navigate("/")));
      },
    },
    {
      Icon: FaCloudUploadAlt,
      text: "Save",
      className: "out-creator",
      onClick: () => {
        dispatch(SAVE(() => navigate("/")));
      },
    },
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
        {buttons.map(({ Icon, text, className, onClick }, i) => (
          <button
            key={i}
            className={cn("ml-2 std-btn", className)}
            onClick={onClick}
          >
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
  button:not(.out-creator) {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    &:hover {
      background: rgba(255, 255, 255, 0.33);
    }
  }
  @media (min-width: ${breakpoints.lg}px) {
    button:first-child {
      display: flex;
    }
  }
`;
