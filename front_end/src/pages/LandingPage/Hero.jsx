import { FaChevronRight } from "react-icons/fa";
import styled from "styled-components";
import { imgLink } from "../../helpers/misc";
import { getColor } from "../../styledComponents/helpers";
import { breakpoints } from "../../theme";
import { EmergedButton } from "./styles";

export default function Hero({ openForm }) {
  return (
    <StyledHero className="pos-relative">
      <div className="layout pos-absolute full-stretch">
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
            <EmergedButton onClick={() => openForm("signup")}>
              Sign up for free <FaChevronRight className="ml-3" />
            </EmergedButton>
            <p className="login">
              Already have an account?{" "}
              <span className="pointer" onClick={() => openForm("login")}>
                Login
              </span>
            </p>
          </div>
        </div>
        <div className="image-wrapper">
          <img src={imgLink("mkt/1-HERO-Digital_Collage")} alt="" />
        </div>
      </div>
    </StyledHero>
  );
}

export const StyledHero = styled.div`
  overflow-y: hidden;
  .layout {
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
      @media (min-width: ${breakpoints.md}px) {
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
      color: ${getColor("primaryDark")};
      margin-bottom: 0.75rem;
    }
    h2 {
      color: #73747e;
      font-size: 1rem;
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
    color: ${getColor("primaryDarker")};
  }
  img {
    width: 100%;
  }
  @media (min-width: ${breakpoints.md}px) {
    .content {
      h1 {
        font-size: 2.5rem;
      }
      h2 {
        font-size: 1.25rem;
      }
    }
  }
  @media (min-width: ${breakpoints.lg}px) {
    .content {
      position: pos-relative;
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
        font-size: 3.5rem;
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
