import styled from "styled-components";
import { getColor } from "../../styledComponents/helpers";
import { breakpoints } from "../../theme";

const FormLayout = styled.div`
  --padding: 12px;
  --error-color: #be4b49;
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
  .submit-error {
    color: var(--error-color);
    text-align: center;
  }
  .bottom,
  .submit-error {
    border-top: 1px solid #dadde1;
    padding: 16px;
  }
  .group-label {
    margin-bottom: 8px;
    font-weight: 700;
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
      box-shadow: 0 0 0 1px var(--error-color) inset;
    }
  }
  .error-text {
    min-width: 60%;
    border-radius: 4px;
    padding: 0.5rem 0.75rem;
    background-color: var(--error-color);
    color: white;
    line-height: 1.5;
  }
  .error-icon {
    position: absolute;
    color: var(--error-color);
    font-size: 1.25rem;
  }
  @media (min-width: ${breakpoints.md}px) {
    width: ${(pr) => pr.width || "432px"};
    max-width: 95%;
    height: auto;
  }
`;

export default FormLayout;
