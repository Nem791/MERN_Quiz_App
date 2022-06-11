import { _QUEST_TYPES } from "../../configs";
import callApi, { handleResponse } from "../../helpers/callApi";
import {
  CLOSE_CREATOR_FE,
  DELETE_QUEST_FE,
  OPEN_CREATOR,
  SAVE_QUEST_FE,
} from "./actions";

export const CREATE_NEW_SET = (data, onSuccess) => (dispatch, getState) => {
  const reqData = {
    type: data.type,
    tags: data.tags,
    title: data.name,
  };
  if (data.setId) {
    reqData._id = data.setId;
  }
  callApi({
    endpoint: "quizzes/store-quiz-set",
    method: "POST",
    reqData,
    token: localStorage.getItem("token"),
  })
    .then(handleResponse)
    .then((resData) => {
      onSuccess();
      dispatch(OPEN_CREATOR({ ...data, _id: resData._id }));
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

export const DELETE_QUEST = (id) => (dispatch) => {
  callApi({
    endpoint: `quizzes/delete-quiz/${id}`,
    method: "DELETE",
    token: localStorage.getItem("token"),
  })
    .then(handleResponse)
    .then((data) => {
      dispatch(DELETE_QUEST_FE(id));
    })
    .catch(console.log);
};

export const CLOSE_CREATOR = (onSuccess) => (dispatch, getState) => {
  const id = getState().creator._id;
  callApi({
    endpoint: `quizzes/delete-quiz-set/${id}`,
    method: "DELETE",
    token: localStorage.getItem("token"),
  })
    .then(handleResponse)
    .then((data) => {
      onSuccess();
      dispatch(CLOSE_CREATOR_FE());
    })
    .catch(console.log);
};

export const SAVE = (onSuccess) => (dispatch, getState) => {
  const _id = getState().creator._id;
  callApi({
    endpoint: `quizzes/update-draft`,
    method: "PUT",
    reqData: { _id },
    token: localStorage.getItem("token"),
  })
    .then(handleResponse)
    .then((data) => {
      onSuccess();
      dispatch(CLOSE_CREATOR_FE());
    })
    .catch(console.log);
};
