import styled from "styled-components";
import { getColor } from "../../styledComponents/helpers";
import { imgLink } from "../../helpers/misc";

export default function BtmSec() {
  return (
    <StyledBtmSec>
      {[].length ? (
        <></>
      ) : (
        <div className="flex-col align-center">
          <img
            className="default-img"
            src={imgLink("empty-state/empty-state-created-content")}
            alt=""
          />
          <p className="fw-600">Create your first quiz or lesson</p>
          <button className="mt-4 create-btn b-radius-3">Create</button>
        </div>
      )}
    </StyledBtmSec>
  );
}

const StyledBtmSec = styled.div`
  .default-img {
    width: 15rem;
    height: 15rem;
  }
  .create-btn {
    padding: 0.5rem 2rem;
    background-color: ${getColor("primary")};
    color: white;
    font-size: 1.125rem;
    &:hover {
      background-color: ${getColor("primaryHover")};
    }
  }
`;
