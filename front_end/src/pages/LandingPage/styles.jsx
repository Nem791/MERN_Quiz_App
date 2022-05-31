import styled from "styled-components";
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
  padding: 12px 24px;
  border-radius: 12px;
  ${landingBtnBg};
  color: white;
  font-size: 1rem;
  font-weight: 700;
  @media (min-width: ${breakpoints.md}px) {
    padding: 18px 36px;
    font-size: 1.25rem;
    box-shadow: 0px 4px 8px rgb(0 0 0 / 10%), 0px 4px 0px #381535;
    &:hover {
      box-shadow: none;
      transform: translateY(4px);
    }
  }
`;

export const LandingButton = styled.button`
  border-radius: 12px;
  padding: 12px 24px;
  ${landingBtnBg};
  color: white;
  font-size: ${(pr) => pr.fs || "1.25rem"};
  &:hover {
    background-color: #381535;
  }
`;
