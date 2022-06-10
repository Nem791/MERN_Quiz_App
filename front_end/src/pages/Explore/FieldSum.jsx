import { Link } from "react-router-dom";
import styled from "styled-components";
import { _EXPLORE_FIELDS } from "../../configs";
import { imgLink } from "../../helpers/misc";
import { getColor } from "../../styledComponents/helpers";
import { breakpoints } from "../../theme";
import useSlideCtrl from "./useSlideCtrl";

const first = "course-assets/title_imgs/";

export default function FieldSum() {
  const [wrapperRef, controllers] = useSlideCtrl();
  return (
    <StyledFieldSum className="pos-relative">
      <div ref={wrapperRef} className="pb-1 overflow-hidden smooth-scroll">
        <div className="list flex">
          {_EXPLORE_FIELDS.map(({ label, img, path }) => (
            <Link key={label} to={path} className="flex-col align-center">
              <div className="p-1 mb-2 img-wrapper b-radius-round">
                <img
                  className="full-w full-h"
                  src={imgLink(first + img)}
                  alt=""
                />
              </div>
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>
      {controllers}
    </StyledFieldSum>
  );
}

const StyledFieldSum = styled.div`
  max-width: 100%;
  margin: 32px 0 16px;
  .list {
    gap: 0.5rem;
  }
  a {
    transition: transform 250ms ease-out;
    &:hover {
      transform: scale(1.1);
    }
  }
  .img-wrapper {
    width: 4rem;
    height: 4rem;
    border: 1px solid ${getColor("dividerLight")};
  }
  span {
    font-size: 0.875rem;
    color: ${getColor("text2")};
    white-space: nowrap;
  }
  .chevron-wrapper {
    width: 40px;
  }
  .chevron-bg {
    filter: blur(4px);
  }
  &:hover .chevron-bg {
    opacity: 0.2;
  }
  .chevron-wrapper:hover .chevron-bg {
    opacity: 0.25;
  }
  .chevron-icon {
    color: ${getColor("white1")};
  }
  @media (min-width: ${breakpoints.md}px) {
    margin-top: 40px;
    .list {
      gap: 2rem;
      padding: 0 1rem;
    }
  }
  @media (min-width: ${breakpoints.lg}px) {
    margin-top: 56px;
  }
`;
