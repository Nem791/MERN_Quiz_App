import styled from "styled-components";
import { breakpoints } from "../../../theme";

const colorsByIndex = ["213, 84, 109", "239, 169, 41", "45, 157, 166"];

const StyledCarousel = styled.div`
  --time: 500ms ease;
  position: relative;
  margin: 32px 0 40px;
  height: 270px;
  .comment {
    position: absolute;
    bottom: 80px;
    width: 100%;
    height: 192px;
    padding: 0 22px;
    border-radius: 1.5rem;
    background-color: ${(pr) => `rgba(${colorsByIndex[pr.index]}, 0.1)`};
    overflow: hidden;
    &.expand {
      animation: expanding-1 var(--time) forwards;
    }
    p {
      text-align: center;
      font-weight: 500;
    }
    p::before {
      content: open-quote;
    }
    p::after {
      content: close-quote;
    }
  }
  .avatar-queue {
    position: absolute;
    transform: translateX(${(pr) => [-32, -84, -124][pr.index]}px);
    bottom: 48px;
    left: 50%;
    gap: 12px;
    transition: all var(--time);
    .pic-wrapper {
      width: 40px;
      height: 40px;
      border-width: 1px;
      border-style: solid;
      overflow: hidden;
      transition: all 300ms ease;
    }
    .pic-wrapper:nth-child(1) {
      border-color: rgb(${colorsByIndex[0]});
    }
    .pic-wrapper:nth-child(2) {
      border: rgb(${colorsByIndex[1]});
    }
    .pic-wrapper:nth-child(3) {
      border: rgb(${colorsByIndex[2]});
    }
    .pic-wrapper.active {
      width: 64px;
      height: 64px;
    }
    img {
      width: 100%;
    }
  }
  .commenter {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    p {
      text-align: center;
      white-space: nowrap;
    }
    .name {
      font-weight: 700;
    }
    .label {
      font-size: 0.875rem;
    }
  }
  @media (min-width: ${breakpoints.md}px) {
    height: 302px;
    .comment {
      padding: 0 40px;
      bottom: 92px;
      height: 212px;
      p {
        font-size: 1.25rem;
      }
      &.expand {
        animation: expanding-2 var(--time) forwards;
      }
    }
    .avatar-queue {
      transform: translateX(${(pr) => [-38, -106, -174][pr.index]}px);
      bottom: 52px;
      gap: 16px;
      .pic-wrapper {
        width: 52px;
        height: 52px;
        border-width: 2px;
      }
      .pic-wrapper.active {
        width: 76px;
        height: 76px;
      }
    }
  }
  @media (min-width: ${breakpoints.lg}px) {
    max-width: 888px;
    margin: 56px;
    .pic-wrapper {
      border-width: 2px;
    }
  }
  @keyframes expanding-1 {
    from {
      height: 0;
    }
    to {
      height: 192px;
    }
  }
  @keyframes expanding-2 {
    from {
      height: 0;
    }
    to {
      height: 212px;
    }
  }
`;

export default StyledCarousel;
