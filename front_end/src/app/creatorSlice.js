import { createSlice } from "@reduxjs/toolkit";
import { _ANSWER_COLORS, _QUEST_TYPES } from "../configs";

const initialAnswerInfo = {
  text: "",
  correct: false,
  warnNoText: false,
  animation: null,
};

const initialEditor = {
  questType: null,
  multiCorrect: false,
  question: "",
  answersById: {},
  allAnswerIds: [],
  timeLimit: 30,
};

const initialState = {
  type: "",
  name: "",
  tags: [],
  savedQuests: {
    byId: {},
    allIds: [],
  },
  editor: initialEditor,
};

const creatorSlice = createSlice({
  name: "creator",
  initialState,
  reducers: {
    OPEN_CREATOR: (state, action) => {
      const { type, name, tags } = action.payload;
      state.type = type;
      state.name = name;
      state.tags = tags;
    },
    CLOSE_CREATOR: () => {
      return initialState;
    },
    OPEN_EDITOR: ({ editor }, action) => {
      const questType = action.payload;
      editor.questType = questType;
      editor.question = "";
      switch (questType) {
        case _QUEST_TYPES.multipleChoice: {
          [...Array(4)].forEach((_, i) => {
            editor.answersById[i + 1] = {
              ...initialAnswerInfo,
              id: i + 1,
              color: _ANSWER_COLORS[i],
            };
          });
          editor.allAnswerIds = [1, 2, 3, 4];
          break;
        }
        default:
          break;
      }
    },
    CLOSE_EDITOR: (state) => {
      state.editor = initialEditor;
    },
    EDIT_QUESTION: (state, action) => {
      state.editor.question = action.payload;
    },
    EDIT_ANSWER: (state, action) => {
      const { id, text } = action.payload;
      const answer = state.editor.answersById[id];
      answer.text = text;
      if (text === "" && answer.correct) {
        answer.correct = false;
      }
    },
    CHOOSE_ANSWER_CORRECT: ({ editor }, action) => {
      if (!editor.multiCorrect) {
        for (const id of editor.allAnswerIds) {
          editor.answersById[id].correct = false;
        }
      }
      editor.answersById[action.payload].correct = true;
    },
    WARN_NO_TEXT: (state, action) => {
      state.editor.answersById[action.payload].warnNoText = true;
    },
    STOP_WARNING: (state, action) => {
      state.editor.answersById[action.payload].warnNoText = false;
    },
    DELETING_ANSWER: (state, action) => {
      state.editor.answersById[action.payload].animation = "deleting";
    },
    DELETED_ANSWER: ({ editor }, action) => {
      const deletedId = action.payload;
      delete editor.answersById[deletedId];
      editor.allAnswerIds = editor.allAnswerIds.filter(
        (id) => id !== deletedId
      );
    },
    ADDED_ANSWER: ({ editor }) => {
      const id = Date.now();
      let nextColor;
      const existedColors = Object.values(editor.answersById).map(
        ({ color }) => color
      );
      for (const color of _ANSWER_COLORS) {
        if (!existedColors.includes(color)) {
          nextColor = color;
          break;
        }
      }
      editor.answersById[id] = {
        ...initialAnswerInfo,
        id,
        color: nextColor,
        animation: "adding",
      };
      editor.allAnswerIds.push(id);
    },
    TOGGLE_MULTI_CORRECT_ANSWERS: ({ editor }) => {
      editor.multiCorrect = !editor.multiCorrect;
      if (!editor.multiCorrect) {
        for (const id of editor.allAnswerIds) {
          editor.answersById[id].correct = false;
        }
      }
    },
    CHANGE_TIME_LIMIT: (state, action) => {
      state.editor.timeLimit = action.payload;
    },
    SAVE_QUEST: (state) => {
      const { allAnswerIds, answersById, ...rest } = state.editor;
      const answers = allAnswerIds.map(({ text, correct }) => ({
        text,
        correct,
      }));
      const id = Date.now();
      state.savedQuests.byId[id] = {
        ...rest,
        answers,
      };
      state.savedQuests.allIds.push(id);
      state.editor = initialEditor;
    },
  },
});

export const {
  OPEN_CREATOR,
  CLOSE_CREATOR,
  OPEN_EDITOR,
  CLOSE_EDITOR,
  EDIT_QUESTION,
  CHOOSE_ANSWER_CORRECT,
  WARN_NO_TEXT,
  STOP_WARNING,
  EDIT_ANSWER,
  DELETING_ANSWER,
  DELETED_ANSWER,
  ADDED_ANSWER,
  TOGGLE_MULTI_CORRECT_ANSWERS,
  CHANGE_TIME_LIMIT,
  SAVE_QUEST,
} = creatorSlice.actions;

export default creatorSlice.reducer;
