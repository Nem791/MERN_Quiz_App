import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";
import { Collapse } from "../../../components/HiddenSpace";
import { useDebounce } from "../../../hooks";
import { getColor } from "../../../styledComponents/helpers";

export default function SearchBox({ collapse, setCollapse, setFocusing }) {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const keyword = useDebounce(input, 800);

  useEffect(() => {
    if (keyword.length >= 3) {
      setTimeout(() => {
        const fields = ["Math 1", "English", "Math 2"];
        setResults(
          fields.filter((f) =>
            f.toLowerCase().startsWith(keyword.toLowerCase())
          )
        );
      }, 200);
    }
  }, [keyword]);

  useEffect(() => {
    if (results.length) setCollapse("input");
  }, [results.length, setCollapse]);

  return (
    <StyledSearchBox className="inherit-br grow-1 pos-relative">
      <FaSearch className="ml-3 search-icon" />
      <input
        className="inherit-br full-w full-h"
        placeholder="Search"
        value={input}
        onChange={(e) => {
          const { value } = e.target;
          if (value.length < 3) {
            setCollapse(null);
            setResults([]);
          }
          setInput(value);
        }}
        onFocus={() => {
          if (results.length) setCollapse("input");
          setFocusing(true);
        }}
        onBlur={() => {
          setCollapse(null);
          setFocusing(false);
        }}
      />
      <Collapse className="collapse" open={collapse === "input"}>
        <div className="py-2">
          {results.map((result, i) => (
            <p key={i} className="pointer">
              {result}
            </p>
          ))}
        </div>
      </Collapse>
    </StyledSearchBox>
  );
}

const StyledSearchBox = styled.div`
  input {
    padding: 8px 8px 8px 36px;
    background-color: inherit;
    color: ${getColor("text1")};
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.02rem;
  }
  .search-icon {
    position: absolute;
    pointer-events: none;
    border-radius: 50%;
    top: 52%;
    transform: translateY(-50%);
  }
  .collapse {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    div {
      border-radius: 0 0 5px 5px;
      background-color: ${getColor("white1")};
    }
    p {
      padding: 4px 16px 4px 36px;
      line-height: 1.5;
      &:hover {
        background-color: ${getColor("primaryLight")};
      }
    }
  }
`;
