import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useGetSearchResultsQuery } from "../../app/thunks";
import Navbar from "./NavBar";
import QuizSet from "../../components/QuizSet";

export default function Search() {
  const params = useParams();
  const [filter, setFilter] = useState({
    tags: "English",
    size: "1, 10",
    sort: "dateAsc",
  });
  const [query, setQuery] = useState("");
  const { data } = useGetSearchResultsQuery(params.key + query);
  console.log(data);

  const changeQuery = () => {
    let result = Object.entries(filter).map(
      ([key, value]) => `${key}=${value}`
    );
    result = "?" + result.join("&");
    setQuery(result);
  };

  return (
    <StyledSearch className="full-w">
      <Navbar filter={filter} setFilter={setFilter} changeQuery={changeQuery} />
      {data && (
        <div className="flex justify-center">
          <div className="set-list flex-col pr-3">
            {data.map((info) => (
              <QuizSet key={info._id} {...info} showOwner={true} />
            ))}
          </div>
        </div>
      )}
    </StyledSearch>
  );
}

const StyledSearch = styled.div`
  margin-top: 7.75rem;
  margin-bottom: 5rem;
  padding: 0 2rem;
  min-height: 100%;
  .set-list {
    width: 60%;
    min-width: 360px;
    gap: 0.5rem;
  }
`;
