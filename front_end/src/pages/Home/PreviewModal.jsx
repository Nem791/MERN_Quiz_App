import { FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { CLOSE_PREVIEW } from "../../app/uiSlice";
import Modal from "../../components/Modal";
import { _QUEST_SET_TYPES } from "../../configs";
import { backendImg } from "../../helpers/misc";
import { getColor } from "../../styledComponents/helpers";

export default function PreviewModal() {
  const {
    _id,
    title,
    type,
    quiz_img,
    user,
    completions,
    tags,
    numberOfQuestion,
  } = useSelector((state) => state.ui.previewedSet);
  const dispatch = useDispatch();
  const location = useLocation();
  const close = () => dispatch(CLOSE_PREVIEW());
  const setType = _QUEST_SET_TYPES[type];

  return (
    <Modal close={close}>
      <StyledPreview className="p-4 b-radius-3 flex-col">
        <img className="cover-image" src={backendImg(quiz_img)} alt="" />
        <h3 className="mt-3">{title}</h3>
        <div className="mt-2 flex">
          <span className="mr-2">{numberOfQuestion} questions</span>-
          <span className="ml-2 capitalize">{setType}</span>
        </div>
        <p className="mt-2">{completions} plays</p>
        <Link
          to={`/${setType}/${_id}`}
          state={{ root: location.pathname }}
          className="mt-3 mx-auto"
        >
          <button className="px-4 py-2 play-btn fs-1 b-radius-2 flex align-center">
            <FaPlay className="mr-2" />
            Start
          </button>
        </Link>
      </StyledPreview>
    </Modal>
  );
}

const StyledPreview = styled.div`
  background-color: white;
  .cover-image {
    max-width: 300px;
    height: auto;
  }
  .play-btn {
    background-color: ${getColor("primary")};
    color: white;
    &:hover {
      background-color: ${getColor("primaryHover")};
    }
  }
`;
