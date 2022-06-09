import cn from "classnames";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import styled from "styled-components";
import { getColor } from "../../styledComponents/helpers";
import { Box } from "../../styledComponents/Layout";

export default function TopSec() {
  const [navIndex, setNaxIndex] = useState(0);
  const stats = [
    { text: "quizzes", count: 0 },
    { text: "collections", count: 0 },
  ];
  const navItems = [{ text: "Library" }, { text: "Collections" }];
  return (
    <StyledTopSec className="pos-relative">
      <button className="ml-auto px-4 py-1 edit-btn flex align-center b-radius-1">
        <FaEdit className="mr-2" />
        <span className="fs-0875 lh-15">Edit Profile</span>
      </button>
      <div className="top-part flex">
        <div className="flex">
          <Box width="7.5rem" height="7.5rem">
            <img
              className="full-w full-h b-radius-round"
              src="https://lh3.googleusercontent.com/a-/AOh14GgqOWUD-SJqp5bmrUDHPllSJTKkdCd-P6Bk24BW=s96-c"
              alt=""
            />
          </Box>
          <div className="personal-info">
            <div className="flex">
              <p className="fw-600">Huan</p>
            </div>
            <p className="fs-0875 lh-15">lathieuhuan@gmail.com</p>
          </div>
        </div>
        <div className="ml-auto flex-col">
          <div className="mt-auto flex">
            {stats.map(({ text, count }) => (
              <div key={text} className="ml-5 flex-col align-center">
                <p className="stat-count">{count}</p>
                <p className="stat-text fs-075">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="btm-part">
        <div className="pos-relative">
          <div className="flex">
            {navItems.map(({ text }, i) => (
              <button
                key={text}
                className={cn("py-2 nav-btn flex-center", {
                  active: i === navIndex,
                })}
                onClick={() => setNaxIndex(i)}
              >
                <span className="fs-1 fw-600 lh-15">{text}</span>
              </button>
            ))}
          </div>
          <div className={cn("border-btm", `pos-${navIndex}`)} />
        </div>
      </div>
    </StyledTopSec>
  );
}

const StyledTopSec = styled.div`
  .top-part {
    padding: 1.5rem;
    border-radius: 0.5rem 0.5rem 0 0;
    background-color: white;
  }
  .personal-info {
    margin-left: 2rem;
  }
  .edit-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    border: 1px solid rgb(229 229 229);
    background-color: white;
    &:hover {
      background-color: rgb(249 249 249);
    }
  }
  .stat-count {
    font-size: 24px;
    line-height: 2rem;
  }
  .stat-text {
    text-transform: uppercase;
    color: ${getColor("text3")};
  }
  /*  */
  .btm-part {
    border-radius: 0 0 0.5rem 0.5rem;
    background-color: rgb(249 249 249);
    padding: 1rem 2rem 0;
  }
  .nav-btn {
    background-color: transparent;
    &.active {
      color: ${getColor("primary")};
    }
  }
  .nav-btn,
  .border-btm {
    width: 8rem;
  }
  .border-btm {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 0.25rem;
    background-color: ${getColor("primary")};
    transition: left 200ms ease-out;
    pointer-events: none;
  }
  .border-btm.pos-1 {
    left: 8rem;
  }
`;
