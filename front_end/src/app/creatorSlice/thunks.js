import { _QUEST_TYPES } from "../../configs";
import callApi, { handleResponse } from "../../helpers/callApi";
import { OPEN_CREATOR, SAVE_QUEST_FE } from "./actions";

export const CREATE_NEW_SET = (reqData) => (dispatch, getState) => {
  callApi({
    endpoint: "quizzes/store-quiz-set",
    method: "POST",
    reqData: {
      type: reqData.type,
      tags: reqData.tags,
      title: reqData.name,
    },
    token: localStorage.getItem("token"),
  })
    .then(handleResponse)
    .then((data) => {
      dispatch(OPEN_CREATOR({ ...reqData, _id: data._id }));
    })
    .catch(console.log);
};

const convertQuestType = {
  [_QUEST_TYPES.multipleChoice]: "multiple_choice",
  [_QUEST_TYPES.fillInTheBlank]: "multiple_choice",
};

export const SAVE_QUEST = (setId, questId) => (dispatch, getState) => {
  const {
    question,
    questType,
    multiCorrect,
    answersById,
    allAnswerIds,
    timeLimit: timer,
  } = getState().creator.editor;
  let type = convertQuestType[questType];
  if (questType === _QUEST_TYPES.multipleChoice && multiCorrect) {
    type += "_answers";
  }
  const options = allAnswerIds.map((id) => answersById[id].text);
  const answer = [];
  for (const id of allAnswerIds) {
    if (answersById[id].correct) {
      answer.push(answersById[id].text);
    }
  }
  const reqData = {
    question,
    type,
    options,
    answer,
    timer,
    set: setId,
  };
  if (questId) {
    reqData._id = questId;
  }
  callApi({
    endpoint: "quizzes/store-quiz",
    method: "POST",
    reqData,
    token: localStorage.getItem("token"),
  })
    .then(handleResponse)
    .then((data) => {
      dispatch(SAVE_QUEST_FE(data._id));
    })
    .catch(console.log);
};