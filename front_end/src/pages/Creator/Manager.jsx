import { useRef, useState } from "react";
import { BiBook } from "react-icons/bi";
import { FaEye, FaEyeSlash, FaImage } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CreateModal from "../../components/CreateModal";
import { _SERVER } from "../../configs";
import { handleResponse } from "../../helpers/callApi";
import { backendImg } from "../../helpers/misc";
import { getColor } from "../../styledComponents/helpers";
import { mausac } from "../../theme";

export default function Manager({ img, setImg }) {
  const name = useSelector((state) => state.creator.name);
  const type = useSelector((state) => state.creator.type);
  const tags = useSelector((state) => state.creator.tags);
  const setId = useSelector((state) => state.creator._id);
  const isPrivate = useSelector((state) => state.creator.isPrivate);
  const [modalOn, setModalOn] = useState(false);
  const ref = useRef();
  const PrivateIcon = isPrivate ? FaEyeSlash : FaEye;

  return (
    <StyledManager className="p-4 mb-2">
      <div
        className="p-2 img-part flex-col flex-center pointer"
        onClick={() => {
          if (ref.current) ref.current.click();
        }}
      >
        {img ? (
          <img className="cover-img" src={backendImg(img)} alt="" />
        ) : (
          <>
            <div className="icon-wrapper b-radius-round flex-center">
              <FaImage size="1.5rem" color="white" />
            </div>
            <p className="mt-3">Click here to upload a quiz image</p>
          </>
        )}
        <input
          ref={ref}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const formData = new FormData();
            const image = e.target.files[0];
            formData.append("image", image);
            formData.append("_id", setId);
            formData.append("title", name);
            fetch(`${_SERVER}/quizzes/store-quiz-set`, {
              headers: {
                "Contetnt-Type": undefined,
                authorization: localStorage.getItem("token"),
              },
              method: "POST",
              body: formData,
            })
              .then(handleResponse)
              .then((data) => setImg(data.quiz_img))
              .catch(console.log);
          }}
        />
      </div>
      <div className="mt-3 flex justify-between align-center">
        <p className="fw-600">{name}</p>
        <button
          className="p-1 edit-btn flex-center"
          onClick={() => setModalOn(true)}
        >
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
      {modalOn && (
        <CreateModal
          initialValues={{ setId, name, type, tags }}
          onSuccess={() => setModalOn(false)}
          close={() => setModalOn(false)}
        />
      )}
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
    .cover-img {
      object-fit: contain;
      height: 100%;
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
