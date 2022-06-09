import Modal from "../../components/Modal";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_PREVIEW } from "../../app/uiSlice";
import { FaPlay } from "react-icons/fa";
import { getColor } from "../../styledComponents/helpers";
import { Link } from "react-router-dom";

export default function PreviewModal() {
  const { id, img, title, type, quests, plays } = useSelector(
    (state) => state.ui.previewedSet
  );
  const dispatch = useDispatch();
  const close = () => dispatch(CLOSE_PREVIEW());

  return (
    <Modal close={close}>
      <StyledPreview className="p-4 b-radius-3 flex-col">
        <img src={img} alt="" />
        <h3 className="mt-3">{title}</h3>
        <div className="mt-2 flex">
          <span className="mr-2">{quests} questions</span>-
          <span className="ml-2 capitalize">{type}</span>
        </div>
        <p className="mt-2">{plays} plays</p>
        <Link to={`/${type}/${id}`}>
          <button className="mt-3 mx-auto px-4 py-2 play-btn fs-1 b-radius-2 flex align-center">
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
  .play-btn {
    background-color: ${getColor("primary")};
    color: white;
    &:hover {
      background-color: ${getColor("primaryHover")};
    }
  }
`;
