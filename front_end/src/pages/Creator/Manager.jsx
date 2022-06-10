import { FaImage, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import styled from "styled-components";
import { getColor } from "../../styledComponents/helpers";
import { mausac } from "../../theme";
import { BiBook } from "react-icons/bi";
import { useSelector } from "react-redux";

export default function Manager() {
  const name = useSelector((state) => state.creator.name);
  const tags = useSelector((state) => state.creator.tags);
  const isPrivate = useSelector((state) => state.creator.isPrivate);
  const PrivateIcon = isPrivate ? FaEyeSlash : FaEye;

  return (
    <StyledManager className="p-4 mb-2">
      <div className="p-4 img-part flex-col flex-center pointer">
        <div className="mb-3 icon-wrapper b-radius-round flex-center">
          <FaImage size="1.5rem" color="white" />
        </div>
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
