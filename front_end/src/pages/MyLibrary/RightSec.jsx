import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { DELETE_MY_SET, useGetMyLibraryQuery } from "../../app/thunks";
import QuizSet from "../../components/QuizSet";
import { Box } from "../../styledComponents/Layout";

export default function RightSec({ library }) {
  const { data } = useGetMyLibraryQuery(library);
  const deletedIds = useSelector((state) => state.ui.deletedIds);
  const dispatch = useDispatch();
  if (!data) return null;
  console.log(data);
  return (
    <StyledRightSec className="full-w">
      <Box className="mb-4 flex" height="2rem"></Box>
      <div className="quest-list flex-col">
        {data.map((info) =>
          deletedIds[info._id] ? null : (
            <QuizSet
              key={info._id}
              showOwner={false}
              {...info}
              deleteSet={() => dispatch(DELETE_MY_SET(info._id))}
            />
          )
        )}
      </div>
    </StyledRightSec>
  );
}

const StyledRightSec = styled.div`
  .quest-list {
    gap: 0.25rem;
  }
`;
