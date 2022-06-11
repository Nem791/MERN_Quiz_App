import { FaImage, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import styled from "styled-components";
import { getColor } from "../../styledComponents/helpers";
import { mausac } from "../../theme";
import { BiBook } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useRef } from "react";
import callApi from "../../helpers/callApi";

export default function Manager({ img, setImg }) {
  const name = useSelector((state) => state.creator.name);
  const tags = useSelector((state) => state.creator.tags);
  const setId = useSelector((state) => state.creator._id);
  const isPrivate = useSelector((state) => state.creator.isPrivate);
  const ref = useRef();
  const PrivateIcon = isPrivate ? FaEyeSlash : FaEye;
  console.log(setId);

  return (
    <StyledManager className="p-4 mb-2">
      <div
        className="p-4 img-part flex-col flex-center pointer"
        onClick={() => {
          if (ref.current) ref.current.click();
        }}
      >
        <div className="mb-3 icon-wrapper b-radius-round flex-center">
          {img ? (
            <img src={URL.createObjectURL(img)} alt="" />
          ) : (
            <FaImage size="1.5rem" color="white" />
          )}
        </div>
        <input
          ref={ref}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const formData = new FormData();
            console.log(e.target.files[0]);
            formData.append("quiz_img", e.target.files[0]);
            formData.append("_id", setId);
            fetch("http://localhost:3000/quizzes/store-quiz-set", {
              headers: {
                "Contetnt-Type": undefined,
                authorization: localStorage.getItem("token"),
              },
              method: "POST",
              body: formData,
            })
              .then((res) => res.json())
              .then(console.log)
              .catch(console.log);
            // const img = e.target.files[0];
            // console.log(img);
            // setImg(img);
            // callApi({
            //   endpoint: "quizzes/store-quiz-set",
            //   method: "POST",
            //   reqData: {
            //     _id: setId,
            //     quiz_img: img,
            //   },
            //   token: localStorage.getItem("token"),
            // });
          }}
        />
        <p>Click here to upload a quiz image</p>
      </div>
      <div className="mt-3 flex justify-between align-center">
        <p className="fw-600">{name}</p>
        <button className="p-1 edit-btn flex-center">
          <MdEdit size="1.125rem" />
        </button>
      </div>
      <div className="ml-1 mt-2 extra-info-part flex">
        <button>
          <PrivateIcon />
          {isPrivate ? "Private" : "Public"}
        </button>
      </div>
      <div className="mt-2 tags-part flex align-start">
        <BiBook size="1.25rem" />
        <div className="ml-1 flex-col">
          {tags.map((tag, i) => (
            <p key={i} className="my-1">
              {tag}
            </p>
          ))}
        </div>
      </div>
    </StyledManager>
  );
}

const StyledManager = styled.div`
  --br: 0.5rem;
  border-radius: var(--br);
  border: 1px solid ${getColor("dividerLight")};
  .img-part {
    height: 9.5rem;
    background-color: ${getColor("white1")};
    border-radius: var(--br);
    p {
      color: ${getColor("text3")};
      font-size: 0.875rem;
    }
  }
  .icon-wrapper {
    width: 4rem;
    height: 4rem;
    background-color: ${mausac.xanhngoc};
  }
  .edit-btn {
    border-radius: 3px;
    background-color: ${getColor("white1")};
  }
  .extra-info-part {
    button {
      display: flex;
      align-items: center;
      color: ${getColor("primary")};
      font-size: 0.875rem;
    }
    svg {
      margin-right: 0.25rem;
    }
  }
  .tags-part {
    color: ${getColor("text3")};
    font-size: 0.875rem;
  }
`;
