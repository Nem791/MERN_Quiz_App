import { useDispatch } from "react-redux";
import styled from "styled-components";
import { OPEN_PREVIEW } from "../../app/uiSlice";
import { _QUEST_SET_TYPES } from "../../configs";
import { backendImg } from "../../helpers/misc";
import { getColor } from "../../styledComponents/helpers";
import { boxShadows, breakpoints } from "../../theme";

export default function Card(info) {
  const dispatch = useDispatch();
  return (
    <StyledCard onClick={() => dispatch(OPEN_PREVIEW(info))}>
      <div className="full-h flex-col">
        <div className="flex top-part">
          <img
            className="full-w full-h"
            src={backendImg(info.quiz_img)}
            alt=""
          />
        </div>
        <div className="btm-part full-h flex-col">
          <div className="flex">
            <span className="type">{_QUEST_SET_TYPES[info.type]}</span>
          </div>
          <p className="title mt-2 mb-4">{info.title}</p>
          <div className="footer mt-auto">
            <span className="mr-1">{info.numberOfQuestion} questions</span> •{" "}
            <span>{info.completions} plays</span>
          </div>
        </div>
      </div>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  --br: 0.75rem;
  margin: 8px 8px 16px;
  border-radius: var(--br);
  height: 15rem;
  background-color: ${getColor("white1")};
  box-shadow: ${boxShadows.thin};
  &:hover {
    box-shadow: ${boxShadows.emerge};
  }
  .top-part {
    img {
      width: 11rem;
      height: 7rem;
      border-radius: var(--br) var(--br) 0 0;
      object-fit: cover;
    }
  }
  .btm-part {
    padding: 0.625rem;
  }
  .type {
    font-size: 0.625rem;
    font-weight: 600;
    text-transform: uppercase;
    border-radius: 100px;
    padding: 3px 6px;
    color: ${getColor("text2")};
    background-color: ${getColor("white2")};
  }
  .title {
    color: ${getColor("text1")};
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.5rem;
  }
  .footer {
    font-size: 0.625rem;
    color: ${getColor("text3")};
  }
  @media (min-width: ${breakpoints.lg}px) {
    height: 18rem;
    .top-part {
      img {
        width: 15rem;
        height: 10rem;
      }
    }
    .title {
      font-size: 1rem;
    }
    .footer {
      font-size: 0.75rem;
    }
  }
`;
