import styled from "styled-components";

export const Layout = styled.div`
  --padding: 12px;
  --error-color: #be4b49;
  --primary-color: #461a42;
  width: 432px;
  max-width: 95%;
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
  .bottom {
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
    display: none;
    position: absolute;
    bottom: calc(100% + 5px);
    left: 50%;
    transform: translateX(-50%);
    border-radius: 3px;
    padding: 0.75rem;
    color: white;
    background-color: var(--error-color);
    &:after {
      content: "";
      border-style: solid;
      border-color: var(--error-color) transparent transparent transparent;
      border-width: 5px;
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
    }
  }
  .error-icon {
    position: absolute;
    color: var(--error-color);
    font-size: 1.25rem;
    pointer-events: none;
  }
`;

export const StyledTextGroup = styled.div`
  input {
    width: 100%;
    font-size: 1rem;
    outline: none;
    &.error {
      border-color: var(--error-color);
    }
    &:focus {
      border: 1px solid var(--primary-color);
      box-shadow: 0 0 0 1px var(--primary-color) inset;
    }
  }
  input:focus + .error-text {
    display: block;
  }
  input:focus + .error-text + .error-icon {
    display: none;
  }
  .error-icon {
    top: var(--padding);
    right: var(--padding);
  }
`;

export const StyledRadioGroup = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 -0.5rem;
  & > div {
    padding: 0 0.5rem;
  }
`;
