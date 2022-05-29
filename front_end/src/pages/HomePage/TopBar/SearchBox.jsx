import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Collapse } from "../../../components/HiddenSpace";
import { useDebounce } from "../../../hooks";

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
  );
}
