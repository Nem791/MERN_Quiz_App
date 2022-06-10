import styled from "styled-components";
import { getColor } from "../../styledComponents/helpers";
import { breakpoints } from "../../theme";

const FormLayout = styled.div`
  --padding: 12px;
  --primary-color: ${getColor("primaryDark")};
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  background-color: white;
  color: var(--primary-color);
  .top {
    position: relative;
    padding: 10px 16px;
    h1 {
      line-height: 1.1875;
    }
    .close-icon {
      position: absolute;
      top: 10px;
      right: 10px;
      color: var(--primary-color);
      opacity: 0.8;
      font-size: 1.5rem;
      &:hover {
        opacity: 1;
      }
    }
  }
  .submitError {
    color: ${getColor("error")};
  }
  .bottom,
  .submitError {
    border-top: 1px solid #dadde1;
  }
  .group-label {
    font-weight: 600;
    margin-bottom: 0.5rem;
    &.inline {
      margin: 0 0.5rem 0.75rem 0;
    }
  }
  .input-box {
    background-color: #f5f6f7;
    border: 1px solid #ccd0d5;
    border-radius: 5px;
    padding: var(--padding);
    &:not(.error):not(:focus):hover {
      border-color: black;
    }
    &.error:not(:focus):hover {
      box-shadow: 0 0 0 1px ${getColor("error")} inset;
    }
  }
  .error-text {
    border-radius: 4px;
    padding: 0.5rem 0.75rem;
    background-color: ${getColor("error")};
    color: white;
    font-size: 0.875rem;
    line-height: 1.5;
  }
  .error-icon {
    position: absolute;
    color: ${getColor("error")};
    font-size: 1.25rem;
  }
  @media (min-width: ${breakpoints.md}px) {
    width: ${(pr) => pr.width || "432px"};
    max-width: 95%;
    height: auto;
  }
`;

export default FormLayout;

export const StyledCommonTextInput = styled.div`
  input {
    width: 100%;
    &.error {
      border-color: ${getColor("error")};
    }
    &:focus {
      border: 1px solid var(--primary-color);
      box-shadow: 0 0 0 1px var(--primary-color) inset;
    }
  }
  input:focus ~ .error-text {
    display: block;
  }
  input:focus ~ .error-icon {
    display: none;
  }
  .error-icon {
    top: var(--padding);
    right: var(--padding);
    pointer-events: none;
  }
`;
