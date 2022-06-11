import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getColor } from "../../../styledComponents/helpers";
import { Box } from "../../../styledComponents/Layout";
import { boxShadows } from "../../../theme";
import TimeLimitSelect from "../TimeLimitSelect";
import MidSec from "./MidSec";
import TopSec from "./TopSec";

export default function QuestList() {
  const questIds = useSelector((state) => state.creator.savedQuests.allIds);
  return (
    <StyledQuestList className="flex-col">
      {questIds.map((id, i) => (
        <Quest key={id} id={id} index={i} />
      ))}
    </StyledQuestList>
  );
}

const StyledQuestList = styled.div`
  width: 624px;
`;

const selectQuestById = createSelector(
  (state) => state.creator.savedQuests.byId,
  (_, id) => id,
  (questsById, id) => questsById[id]
);

function Quest({ id, index }) {
  const quest = useSelector((state) => selectQuestById(state, id));
  if (!quest) return null;
  return (
    <StyledQuest className="my-2 left-sec-children full-w">
      <Box className="p-2" borderRadius="0.5rem 0.5rem 0 0" bgColor="#F9F9F9">
        <TopSec id={id} index={index} questType={quest.questType} />
      </Box>
      <Box className="p-4" bgColor="white">
        <MidSec question={quest.question} answers={quest.answers} />
      </Box>
      <Box
        className="p-2 flex"
        borderRadius="0 0 0.5rem 0.5rem"
        bgColor="#F9F9F9"
      >
        <div className="ml-auto">
          <TimeLimitSelect
            btnCn="py-2 full-w fs-0875"
            collapseInnerCn="collapse-inner custom-sb"
            timeLimit={quest.timeLimit}
          />
        </div>
      </Box>
    </StyledQuest>
  );
}

const StyledQuest = styled.div`
  .top-sec,
  .btm-sec {
    background-color: #f9f9f9;
  }
  button,
  .btn {
    border: 1px solid ${getColor("dividerLight")};
    border-radius: 0.25rem;
    background-color: ${getColor("white1")};
  }
  button {
    padding: 0.5rem;
  }
  .ans-choice-divider {
    bottom: -0.5rem;
    left: 2rem;
    background-color: ${getColor("white1")};
    color: ${getColor("text3")};
    line-height: 1;
  }
  .collapse {
    position: absolute;
    bottom: 100%;
    left: 0;
    right: 0;
    z-index: 10;
    background-color: white;
    box-shadow: ${boxShadows.common};
  }
  .collapse-inner {
    max-height: 17.5rem;
  }
  .collapse-option {
    padding: 6px 12px;
    &:hover {
      background-color: rgba(9, 9, 9, 0.1);
    }
    p {
      color: ${getColor("text2")};
    }
  }
`;
