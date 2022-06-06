import styled from "styled-components";

export const Tooltip = styled.span`
  ${({ bgColor = "rgb(25, 25, 25)" }) => {
    return `
      bottom: calc(100% + 6px);
      min-width: 120px;
      background-color: ${bgColor};
      color: white;
      transform-origin: center bottom;
      line-height: 1.4;
      &::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-style: solid;
        border-width: 5px;
        border-color: var(--tooltip-bg) transparent transparent transparent;
      }
    `;
  }}
`;
