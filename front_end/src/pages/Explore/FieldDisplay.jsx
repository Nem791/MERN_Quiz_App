import { FaStar } from "react-icons/fa";
import styled from "styled-components";
import { getColor } from "../../styledComponents/helpers";
import { breakpoints } from "../../theme";
import DisplayCard from "./DisplayCard";
import useSlideCtrl from "./useSlideCtrl";
import { useGetExploreSetsQuery } from "../../app/thunks";

export default function FieldDisplay({ label }) {
  const [wrapperRef, controllers] = useSlideCtrl();
  const { data } = useGetExploreSetsQuery();
  if (!data) return null;
  const set = data.find(({ _id }) => _id === label);
  if (!set) return null;

  return (
    <StyledFieldDisplay>
      <div className="pl-1 field-heading flex align-center">
        <FaStar className="mb-1" color="#efa929" size="1.25rem" />
        <p className="ml-2">{label}</p>
      </div>
      <div className="field-content pos-relative">
        <div ref={wrapperRef} className="overflow-hidden smooth-scroll">
          <div className="flex">
            {set.quizzes.map((info) => (
              <DisplayCard key={info._id} {...info} />
            ))}
          </div>
        </div>
        {controllers}
      </div>
    </StyledFieldDisplay>
  );
}

const StyledFieldDisplay = styled.div`
  .field-heading {
    margin-top: 1.5rem;
    font-size: 1.5rem;
    font-weight: 600;
  }
  // for inside controllers
  .chevron-wrapper {
    width: 54px;
  }
  .chevron-bg {
    filter: blur(8px);
  }
  .field-content:hover .chevron-bg {
    opacity: 0.2;
  }
  .chevron-wrapper:hover .chevron-bg {
    opacity: 0.25;
  }
  .chevron-icon {
    border-radius: 50%;
    background-color: ${getColor("white1")};
    color: ${getColor("black1")};
  }
  @media (min-width: ${breakpoints.lg}px) {
    .field-heading {
      margin-top: 2rem;
      margin-bottom: 0.5rem;
    }
  }
`;
