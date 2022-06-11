import styled from "styled-components";
import QuizSet from "../../components/QuizSet";

export default function SetList({ data }) {
  return (
    <StyledSetList className="flex-col pr-3">
      {data.map((info) => (
        <QuizSet key={info._id} {...info} />
      ))}
    </StyledSetList>
  );
}

const StyledSetList = styled.div`
  gap: 1rem;
`;
