import styled from "styled-components";
import { getColor } from "./helpers";

export const MainButton = styled.button`
  color: ${getColor("primaryText")};
  padding: ${(pr) => pr.padding || "0.625rem 1rem"};
  border-radius: 0.5rem;
  background-color: ${getColor("primary")};
  font-size: ${(pr) => pr.fs || "1rem"};
  font-weight: 600;
  &:hover {
    background-color: ${getColor("primaryHover")};
  }
  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;
