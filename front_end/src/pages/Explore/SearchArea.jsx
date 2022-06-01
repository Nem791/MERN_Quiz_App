import { FaChevronRight, FaSearch } from "react-icons/fa";
import styled from "styled-components";
import { getColor } from "../../styledComponents/helpers";
import { breakpoints } from "../../theme";

export default function SearchArea() {
  return (
    <StyledSearchArea className="quiz-search pos-relative">
      <FaSearch />
      <input placeholder="Search for quizzes of any topic" />
      <FaChevronRight className="svg-chevron pointer" />
    </StyledSearchArea>
  );
}

const StyledSearchArea = styled.div`
  width: 90%;
  padding: 0 16px;
  border-radius: 4rem;
  background-color: ${getColor("white1")};
  font-size: 0.875rem;
  input {
    width: 100%;
    border: none;
    padding: 8px 40px 8px 36px;
    font-size: inherit;
    line-height: 1.5rem;
    font-weight: 600;
    outline: none;
    &::placeholder {
      color: #a6a4a3;
    }
  }
  svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .svg-chevron {
    right: 2rem;
  }
  @media (min-width: ${breakpoints.lg}px) {
    width: 75%;
    padding: 12px 24px;
    font-size: 1.5rem;
    input {
      line-height: 2rem;
    }
  }
`;
