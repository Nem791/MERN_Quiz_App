import styled from "styled-components";
import { getColor } from "../../styledComponents/helpers";
import { breakpoints } from "../../theme";

export const StyledLandingPage = styled.div`
  background-color: white;
  font-family: "Quicksand", sans-serif;
  .content {
    padding-top: 92px;
  }
`;

const landingBtnBg = "background-color: #5d2057";

export const EmergedButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  ${landingBtnBg};
  color: white;
  font-size: 1rem;
  font-weight: 700;
  @media (min-width: ${breakpoints.md}px) {
    padding: 18px 36px;
    font-size: 1.25rem;
    box-shadow: 0px 4px 8px rgb(0 0 0 / 10%),
      0px 4px 0px ${getColor("primaryDarker")};
    &:hover {
      box-shadow: none;
      transform: translateY(4px);
    }
  }
`;

export const LandingButton = styled.button`
  border-radius: 0.75rem;
  padding: 0.75rem 1.5rem;
  ${landingBtnBg};
  color: white;
  font-size: ${(pr) => pr.fs || "1.25rem"};
  &:hover {
    background-color: ${getColor("primaryDarker")};
  }
`;
