import styled from "styled-components";
import { getColor } from "../../../styledComponents/helpers";

export default function Toolbar() {
  return <StyledToolbar></StyledToolbar>;
}

const StyledToolbar = styled.div`
  background-color: ${getColor("primaryDarker")};
  height: 3rem;
`;
