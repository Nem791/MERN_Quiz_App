import styled from "styled-components";
import { EXPLORE_FIELDS } from "../../configs";
import FieldDisplay from "./FieldDisplay";
import FieldSum from "./FieldSum";
import SearchArea from "./SearchArea";
import { breakpoints } from "../../theme";
import { useGetSetOnExploreQuery } from "../../app/thunks";

export default function Explore() {
  const { data, error, isLoading } = useGetSetOnExploreQuery();
  console.log(data);
  return (
    <StyledExplore>
      <div className="flex-col align-center">
        <p className="heading">What will you learn today?</p>
        <SearchArea />
        <FieldSum />
      </div>
      <div className="sets-by-field">
        {EXPLORE_FIELDS.map(({ label }) => (
          <FieldDisplay key={label} heading={label} />
        ))}
      </div>
    </StyledExplore>
  );
}

const StyledExplore = styled.div`
  padding: 24px 16px 16px 16px;
  .heading {
    margin: 16px 0;
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
  }
  .sets-by-field > div {
    overflow: hidden;
  }
  @media (min-width: ${breakpoints.lg}px) {
    .heading {
      margin: 36px 0;
      font-size: 2.5rem;
    }
  }
`;