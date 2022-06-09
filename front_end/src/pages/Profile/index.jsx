import styled from "styled-components";
import BtmSec from "./BtmSec";
import TopSec from "./TopSec";

export default function Profile() {
  return (
    <StyledProfile className="flex justify-center">
      <div className="profile-inner full-w">
        <div className="mx-3">
          <TopSec />
        </div>
        <div className="px-5 btm-sec">
          <BtmSec />
        </div>
      </div>
    </StyledProfile>
  );
}

const StyledProfile = styled.div`
  .profile-inner {
    max-width: 1200px;
    padding-top: 2rem;
  }
  .btm-sec {
    margin-top: 2rem;
  }
`;
