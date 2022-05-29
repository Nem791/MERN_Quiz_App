import cn from "classnames";
import { useEffect, useState } from "react";
import { FaCaretDown, FaRegBell, FaSearch } from "react-icons/fa";
import { Collapse } from "../../../components/HiddenSpace";
import { useDebounce } from "../../../hooks";
import StyledTopBar from "./styles";

export default function TopBar({ setFocusing }) {
  const [searchPlace, setSearchPlace] = useState("Quizizz library");
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [collapse, setCollapse] = useState(null);
  const keyword = useDebounce(input, 300);

  useEffect(() => {
    if (keyword.length >= 3) {
      setTimeout(() => {
        const fields = ["Math 1", "English", "Math 2"];
        setResults(
          fields.filter((f) =>
            f.toLowerCase().startsWith(keyword.toLowerCase())
          )
        );
      }, 500);
    }
  }, [keyword]);

  useEffect(() => {
    if (results.length) setCollapse("input");
  }, [results.length]);

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
          <Collapse open={collapse === "input"}>
            <div className="py-2 results-dropdown">
              {results.map((result, i) => (
                <p key={i} className="pointer">
                  {result}
                </p>
              ))}
            </div>
          </Collapse>
        </div>
        <div className="divider my-2" />
        <div className="inherit-br relative">
          <button
            className="p-2 pr-1 inherit-br full-h full-w flex align-center justify-between"
            onClick={() =>
              setCollapse((prev) => (prev === "place" ? null : "place"))
            }
          >
            <span className="mr-2">{searchPlace}</span>
            <FaCaretDown />
          </button>
          <Collapse className="library-dropdown" open={collapse === "place"}>
            {["Quizizz library", "My library"].map((opt) => (
              <p
                key={opt}
                className={cn("p-2 pr-1 pointer", {
                  active: opt === searchPlace,
                })}
                onClick={() => {
                  setCollapse(false);
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
