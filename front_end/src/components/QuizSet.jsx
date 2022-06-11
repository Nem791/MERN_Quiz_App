import {
  FaList,
  FaPlay,
  FaRegFolder,
  FaRegHeart,
  FaRegTrashAlt,
} from "react-icons/fa";
import { _QUEST_SET_TYPES } from "../configs";
import { renderBackendImg } from "../helpers/misc";
import styled from "styled-components";
import { Box } from "../styledComponents/Layout";
import { getColor } from "../styledComponents/helpers";

export default function QuizSet({ deleteSet, ...info }) {
  const buttons = [
    { Icon: FaRegTrashAlt, text: "Delete", onClick: deleteSet },
    { Icon: FaRegHeart, text: "Like", onClick: () => {} },
    { Icon: FaRegFolder, text: "Save", onClick: () => {} },
  ];
  return (
    <StyledQuizSet className="p-2 b-radius-1 pointer">
      <div className="flex">
        <div className="img-wrapper flex align-center">
          <div>
            <img
              className="full-w full-h"
              src={renderBackendImg(info.quiz_img)}
              alt=""
            />
          </div>
        </div>
        <div className="ml-3 grow-1">
          <Box
            className="mb-1 flex align-center justify-between"
            height="1.5rem"
          >
            <span className="type fs-075">
              {_QUEST_SET_TYPES[info.type].toUpperCase()}
            </span>
            <span className="draft fw-600">DRAFT</span>
          </Box>
          <p className="mb-1 lh-15">
            <b>{info.title}</b>
          </p>
          <div className="mb-3 flex fs-075 lh-1rem">
            <FaList className="mr-2" />
            <span className="mr-3">{info.quizzes.length} Question</span>
            <FaPlay className="mr-2" />
            <span className="mr-3">{info.completions} play</span>
            <FaRegHeart className="mr-2" />
            <span>0</span>
          </div>
          <div className="flex align-center justify-between">
            <div className="flex align-center">
              {/* <div>
                <img
                  className="mr-2 b-radius-round avatar"
                  src="https://picsum.photos/id/237/15/15"
                  alt="avatar"
                />
              </div>
              <div className="username fs-075">
                <span>username</span>
              </div> */}
            </div>
            <div className="flex">
              {buttons.map(({ Icon, text, onClick }) => (
                <button
                  key={text}
                  className="ml-2 px-2 py-1 flex align-center fw-600 fs-075"
                  onClick={onClick}
                >
                  <Icon className="mr-1" />
                  {text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </StyledQuizSet>
  );
}

const StyledQuizSet = styled.div`
  background-color: white;
  border: 1px solid rgba(9, 9, 9, 0.1);
  &:hover {
    background-color: rgb(249 249 249);
  }
  .img-wrapper {
    width: 6.5rem;
    height: 6.5rem;
  }
  .avatar {
    width: 1.5rem;
    height: 1.5rem;
  }
  .username {
    max-width: 5rem;
    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .type {
    color: ${getColor("text3")};
  }
  .draft {
    padding: 0 6px;
    border-radius: 100px;
    background-color: #fcdbe3;
    color: #ec0b43;
    font-size: 0.625rem;
    line-height: 1rem;
  }
  button {
    border-radius: 2px;
    border: 1px solid rgb(229 229 229);
    background-color: white;
  }
`;
