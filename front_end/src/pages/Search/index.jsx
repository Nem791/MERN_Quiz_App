import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useGetSearchResultsQuery } from "../../app/thunks";
import Navbar from "./NavBar";
import SetList from "./SetList";

export default function Search() {
  const params = useParams();
  const [filter, setFilter] = useState({
    tags: "English",
    size: "1,10",
    sort: "dateAsc",
  });
  const [query, setQuery] = useState("");

  const changeQuery = () => {
    let result = Object.entries(filter).map(
      ([key, value]) => `${key}=${value}`
    );
    result = "?" + result.join("&");
    console.log(result);
    setQuery(result);
  };

  const { data } = useGetSearchResultsQuery(params.key + query);
  console.log(data);

  return (
    <StyledSearch className="full-w full-h">
      <Navbar filter={filter} setFilter={setFilter} changeQuery={changeQuery} />
      <div>
        <div>{data && <SetList data={data} />}</div>
        <div></div>
      </div>
    </StyledSearch>
  );
}

const StyledSearch = styled.div`
  margin-top: 7.75rem;
  padding: 0 2rem;
`;
