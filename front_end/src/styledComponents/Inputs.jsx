import styled from "styled-components";
import { getColor } from "./helpers";

export const MainButton = styled.button`
  color: ${getColor("primaryText")};
  padding: ${(pr) => pr.padding || "0.625rem 1rem"};
  border-radius: 0.375rem;
  background-color: ${getColor("primary")};
  font-size: ${(pr) => pr.fs || "1rem"};
  font-weight: 600;
  &:hover {
    background-color: ${getColor("primaryHover")};
  }
`;

export const Button = styled.button`
  color: ${(pr) => pr.theme[pr.color || "text1"]};
  padding: ${(pr) => pr.padding || "0.625rem 1rem"};
  border-radius: 0.375rem;
  background-color: ${(pr) => pr.theme[pr.bgColor || "white2"]};
  font-size: ${(pr) => pr.fs || "1rem"};
  font-weight: 600;
  ${(pr) =>
    pr.darkerOnHover &&
    `
      &:hover {
        filter: brightness(0.8);
      }
  `};
`;
