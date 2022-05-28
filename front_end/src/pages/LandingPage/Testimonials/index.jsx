import styled from "styled-components";
import { breakpoints } from "../../../theme";
import Carousel from "./Carousel";

export default function Testimonials() {
  return (
    <StyledTestimonials className="mx-auto">
      <h2 className="mb-2 mx-auto">
        Loved by educators in over 50% of U.S. schools and 150 countries.
      </h2>
      <p className="text-small">Here's what they have to say...</p>
      <Carousel />
      <div className="mx-auto divider" />
      <p className="text-small">
        We're also used in businesses and nonprofits ranging from startups to
        the Fortune 500.
      </p>
      <div className="logo-container flex-center">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="logo-wrapper flex-center">
            <img
              src={`https://cf.quizizz.com/img/mkt/2-SOCIAL_PROOF-Logo_${
                i + 1
              }.png`}
              alt=""
            />
          </div>
        ))}
      </div>
    </StyledTestimonials>
  );
}

const StyledTestimonials = styled.div`
  padding: 72px 16px;
  h2 {
    color: #292a3a;
    font-size: 20px;
    text-align: center;
  }
  .text-small {
    font-size: 14px;
    font-weight: 500;
    color: #73747e;
    text-align: center;
  }
  .divider {
    margin-bottom: 28px;
    width: 160px;
    height: 2px;
    background: rgba(9, 9, 9, 0.1);
  }
  .logo-container {
    flex-wrap: wrap;
    margin-top: 16px;
  }
  .logo-wrapper {
    padding: 4px;
    width: 33%;
    img {
      height: 44px;
    }
  }
  @media (min-width: ${breakpoints.sm}px) {
    padding: 64px 20px;
    h2 {
      font-size: 28px;
    }
    .text-small {
      font-size: 16px;
    }
    .logo-wrapper {
      width: 25%;
      img {
        height: 58px;
      }
    }
  }
  @media (min-width: ${breakpoints.md}px) {
    max-width: 1280px;
    padding: 80px 64px 64px;
    h2 {
      font-size: 32px;
      max-width: 808px;
    }
    .text-small {
      font-size: 18px;
    }
  }
`;
