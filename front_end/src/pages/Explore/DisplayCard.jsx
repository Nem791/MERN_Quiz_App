import cn from "classnames";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getColor } from "../../styledComponents/helpers";
import { boxShadows, breakpoints } from "../../theme";

const details = {
  title: "Liberation of Netherlands",
  img:
    "https://quizizz.com/media/resource/gs/quizizz-media/quizzes/b866dcde-01f7-4082-a6e9-72a8683e96a0?w=400&h=400",
  type: "lesson",
  plays: 419,
  quests: 20
};

export default function Card() {
  return (
    <StyledCard to="/">
      <div className="full-h flex-col">
        <div className={cn("flex top-part", { "with-desc": details.desc })}>
          <img className="full-w full-h" src={details.img} alt="" />
        </div>
        <div className="btm-part full-h flex-col">
          <div className="flex">
            <span className="type">{details.type}</span>
          </div>
          <p className="title mt-2 mb-4">{details.title}</p>
          <div className="footer mt-auto">
            <span className="mr-1">{details.quests} questions</span> •{" "}
            <span>{details.plays} plays</span>
          </div>
        </div>
      </div>
    </StyledCard>
  );
}

const StyledCard = styled(Link)`
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
