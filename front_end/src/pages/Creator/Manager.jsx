import { FaImage, FaEye, FaLanguage, FaClock } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import styled from "styled-components";
import { getColor } from "../../styledComponents/helpers";
import { mausac } from "../../theme";
import { BiBook } from "react-icons/bi";

function convertTime(sec) {
  return sec + "s";
}

export default function Manager({
  name = "Placeholder",
  isPublic,
  language = "English",
  dfltTimer = 30,
  tags = [],
}) {
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
      <div className="mt-2 extra-info-part flex">
        <button>
          <FaEye />
          {isPublic ? "Public" : "Private"}
        </button>
        <span className="mx-2">•</span>
        <button>
          <FaLanguage size="1rem" />
          {language}
        </button>
        <span className="mx-2">•</span>
        <button>
          <FaClock />
          {convertTime(dfltTimer)}
        </button>
      </div>
      <div className="mt-2 tags-part flex align-center">
        <BiBook size="1.25rem" />
        <p className="ml-1 ellipsis">{tags.join(" | ")}</p>
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
