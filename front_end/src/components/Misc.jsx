import { imgLink } from "../helpers/misc";
import cn from "classnames";
import styled from "styled-components";

const StyledLogo = styled.img`
  width: ${(pr) => pr.width};
  height: ${(pr) => pr.height};
`;
export const SiteLogo = ({ className, ...rest }) => (
  <StyledLogo
    className={cn("mr-3", className)}
    src={imgLink("quizizz_logos/purple-brandmark-600x164")}
    alt=""
    {...rest}
  />
);
