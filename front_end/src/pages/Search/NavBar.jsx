import { FaCaretDown, FaSearch } from "react-icons/fa";
import styled from "styled-components";
import DropdownButton from "../../components/DropdownButton";
import { getColor } from "../../styledComponents/helpers";
import { boxShadows } from "../../theme";

const _TAGS = [
  "Biology",
  "History",
  "English",
  "Geography",
  "Grammar",
  "Science",
  "Social Studies",
  "World Language",
];
const _SIZE = ["1, 10", "10, 20", "20, 30"];
const _SORT = ["dateAsc", "dateDesc"];

const convertSort = {
  dateAsc: "Ascending",
  dateDesc: "Descending",
};

export default function Navbar({ filter, setFilter, changeQuery }) {
  return (
    <StyledNavbar className="flex align-end">
      <div className="mb-3 full-w flex align-center">
        <DropdownButton
          width="9rem"
          btnText={filter.tags}
          IconRight={FaCaretDown}
          iconRightCn="ml-auto"
          collapseCn="collapse"
          listWrapperCn="list-wrapper"
          listItems={_TAGS}
          renderItem={(tags) => (
            <p
              key={tags}
              className="px-4 py-2 item"
              onClick={() => {
                setFilter((prev) => ({ ...prev, tags }));
              }}
            >
              {tags}
            </p>
          )}
        />
        <DropdownButton
          width="6rem"
          wrapperCn="ml-4"
          btnText={filter.size.replace(", ", "-")}
          IconRight={FaCaretDown}
          iconRightCn="ml-auto"
          collapseCn="collapse"
          listWrapperCn="list-wrapper"
          listItems={_SIZE}
          renderItem={(range) => (
            <p
              key={range}
              className="px-2 py-2"
              onClick={() => {
                setFilter((prev) => ({ ...prev, size: range }));
              }}
            >
              {range.replace(", ", "-")}
            </p>
          )}
        />
        <p className="ml-1 mr-5">questions</p>
        <DropdownButton
          width="9rem"
          btnText={convertSort[filter.sort]}
          IconRight={FaCaretDown}
          iconRightCn="ml-auto"
          collapseCn="collapse"
          listWrapperCn="list-wrapper"
          listItems={_SORT}
          renderItem={(sort) => (
            <p
              key={sort}
              className="px-2 py-2"
              onClick={() => {
                setFilter((prev) => ({ ...prev, sort }));
              }}
            >
              {convertSort[sort]}
            </p>
          )}
        />
        <button
          className="search-btn ml-auto b-radius-round p-3"
          onClick={changeQuery}
        >
          <FaSearch />
        </button>
      </div>
    </StyledNavbar>
  );
}

const StyledNavbar = styled.div`
  position: fixed;
  top: 3.5rem;
  width: calc(100vw - 264px);
  padding: 0 1.5rem;
  height: 4rem;
  border-radius: 0 0 0.5rem 0.5rem;
  background-color: white;
  box-shadow: ${boxShadows.common};
  .btn {
    padding: 0.5rem 0.75rem;
    border: 1px solid ${getColor("dividerLight")};
    border-radius: 0.25rem;
    background-color: white;
    font-size: 1rem;
  }
  .collapse {
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    z-index: 1;
  }
  .list-wrapper {
    border: 1px solid ${getColor("dividerLight")};
    border-radius: 0.25rem;
    background-color: ${getColor("white1")};
  }
  .item:hover {
    background-color: ${getColor("dividerLight")};
  }
  .search-btn {
    border: ${getColor("dividerLight")};
  }
`;
