import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import callApi, { handleResponse } from "../../helpers/callApi";
import BtmSec from "./BtmSec";
import TopSec from "./TopSec";

export default function Profile() {
  const [info, setInfo] = useState({});
  const userId = useSelector((state) => state.user._id);

  useEffect(() => {
    callApi({
      endpoint: `users/profile/${userId}`,
      token: localStorage.getItem("token"),
    })
      .then(handleResponse)
      .then((data) => {
        const { _id, profile_img, name, email } = data;
        setInfo({ _id, profile_img, name, email });
      })
      .catch(console.log);
  }, []);

  return (
    <StyledProfile className="flex justify-center">
      {info._id && (
        <div className="profile-inner full-w">
          <div className="mx-3">
            <TopSec {...info} />
          </div>
          <div className="px-5 btm-sec">
            <BtmSec {...info} setInfo={setInfo} />
          </div>
        </div>
      )}
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
