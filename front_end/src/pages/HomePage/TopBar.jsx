import cn from "classnames";
import { useEffect, useState } from "react";
import { FaCaretDown, FaRegBell, FaSearch } from "react-icons/fa";
import styled from "styled-components";
import { Collapse } from "../../components/HiddenSpace";
import { useDebounce } from "../../hooks";
import { getColor } from "../../styledComponents/helpers";
import { boxShadows } from "../../theme";

export default function TopBar({ setFocusing }) {
  const [searchPlace, setSearchPlace] = useState("Quizizz library");
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const keyword = useDebounce(input, 1000);

  useEffect(() => {
    if (keyword.length >= 3) {
      setTimeout(() => {
        const fields = ["Math 1", "English", "Math 2"];
        setResults(
          fields.filter((f) =>
            f.toLowerCase().startsWith(keyword.toLowerCase())
          )
        );
      }, 1000);
    }
  }, [keyword]);

  return (
    <StyledTopBar className="full-w flex">
      <div className="search-bar flex grow-1">
        <div className="inherit-br grow-1 relative">
          <div className="ml-3 search-icon">
            <FaSearch />
          </div>
          <input
            className="inherit-br full-w full-h"
            placeholder="Search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setFocusing(true)}
            onBlur={() => {
              setResults([]);
              setFocusing(false);
            }}
          />
          <Collapse className="results-dropdown" open={results.length}>
            {results.map((result, i) => (
              <p key={i} className="px-3 py-2">
                {result}
              </p>
            ))}
          </Collapse>
        </div>
        <div className="divider my-2" />
        <div className="inherit-br relative">
          <button
            className="p-2 pr-1 inherit-br full-h full-w flex align-center justify-between"
            onClick={() => setCollapsed(!collapsed)}
          >
            <span className="mr-2">{searchPlace}</span>
            <FaCaretDown />
          </button>
          <Collapse className="library-dropdown" open={collapsed}>
            {["Quizizz library", "My library"].map((opt) => (
              <p
                key={opt}
                className={cn("p-2 pr-1 pointer", {
                  active: opt === searchPlace,
                })}
                onClick={() => {
                  setCollapsed(false);
                  setSearchPlace(opt);
                }}
              >
                {opt}
              </p>
            ))}
          </Collapse>
        </div>
      </div>
      <button className="notif-btn ml-4 flex-center">
        <FaRegBell />
      </button>
    </StyledTopBar>
  );
}

export const StyledTopBar = styled.div`
  height: 56px;
  padding: 8px;
  border-left: 2px solid ${getColor("white2")};
  background-color: ${getColor("white1")};
  box-shadow: ${boxShadows.common};
  z-index: 2;
  .search-bar {
    background-color: ${getColor("white2")};
    border-radius: 0.5rem;
    .inherit-br {
      border-radius: inherit;
    }
    .search-icon {
      position: absolute;
      pointer-events: none;
      border-radius: 50%;
      top: 52%;
      transform: translateY(-50%);
    }
    input {
      padding: 8px 8px 8px 36px;
      border: none;
      outline: none;
      background-color: inherit;
      color: ${getColor("text1")};
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: 0.02rem;
    }
    button {
      font-size: 0.875rem;
    }
    .results-dropdown {
      background-color: ${getColor("white1")};
    }
    .divider {
      width: 1px;
      background: ${getColor("dividerLight")};
    }
    .divider + div {
      min-width: 130px;
    }
    .library-dropdown {
      position: absolute;
      top: 100%;
      background: ${getColor("white1")};
      border-radius: 0 0 5px 5px;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      p:not(:last-child) {
        border-bottom: 1px solid ${getColor("dividerLight")};
      }
      p:last-child {
        border-radius: inherit;
      }
      p:hover {
        background: ${getColor("white2")};
      }
      p.active {
        color: ${getColor("primary")};
        background-color: ${getColor("primaryLight")};
      }
    }
  }
  .notif-btn {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: ${getColor("white2")};
  }
`;
