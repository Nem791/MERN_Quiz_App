import { EmergedButton } from "./styles";
import { FaChevronRight } from "react-icons/fa";
import styled from "styled-components";
import { breakpoints } from "../../theme";

export default function Hero() {
  return (
    <StyledHero className="relative">
      <div className="layout">
        <div className="bottom-ribbon" />
      </div>
      <div className="content">
        <div className="text-section">
          <h1>The 100% engagement platform</h1>
          <h2>
            Find and create free quizzes and interactive lessons to engage any
            learner.
          </h2>
          <div className="mt-4 flex-col">
            <EmergedButton>
              Sign up for free <FaChevronRight className="ml-3" />
            </EmergedButton>
            <p className="login">
              Already have an account? <span>Login</span>
            </p>
          </div>
        </div>
        <div className="image-wrapper">
          <img
            src="https://cf.quizizz.com/img/mkt/1-HERO-Digital_Collage.png"
            alt=""
          />
        </div>
      </div>
    </StyledHero>
  );
}

export const StyledHero = styled.div`
  overflow-y: hidden;
  .layout {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    pointer-events: none;
    .bottom-ribbon {
      position: absolute;
      bottom: 0;
      width: 100%;
      left: 0;
      height: 140px;
      transform: skewY(-3deg) translateY(56px);
      background-color: rgba(255, 164, 2, 0.2);
      opacity: 0.5;
      @media (min-width: ${breakpoints.sm}px) {
        height: 240px;
      }
    }
  }
  .content {
    padding: 48px 24px 0;
    h1,
    h2 {
      text-align: center;
    }
    h1 {
      color: #461a42;
      margin-bottom: 0.75rem;
    }
    h2 {
      color: #73747e;
      font-size: 16px;
      font-weight: 500;
    }
    .text-section > div {
      align-items: center;
    }
    .image-wrapper {
      margin-top: 20px;
    }
    .login {
      margin-top: 12px;
    }
  }
  span {
    font-weight: 600;
    color: #381535;
    cursor: pointer;
  }
  img {
    width: 100%;
  }
  @media (min-width: ${breakpoints.sm}px) {
    .content {
      h1 {
        font-size: 40px;
      }
      h2 {
        font-size: 20px;
      }
    }
  }
  @media (min-width: ${breakpoints.md}px) {
    .content {
      position: relative;
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 0 240px 24px;
      .text-section {
        max-width: 480px;
        div {
          align-items: flex-start;
        }
      }
      h1,
      h2 {
        text-align: left;
      }
      h1 {
        margin-bottom: 16px;
        font-size: 56px;
        line-height: 100%;
      }
      .login {
        margin-top: 24px;
      }
      .image-wrapper {
        margin-top: 0;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 740px;
        height: 510px;
        text-align: right;
      }
    }
  }
`;
