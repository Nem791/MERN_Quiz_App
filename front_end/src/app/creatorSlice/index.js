import { createSlice, current } from "@reduxjs/toolkit";
import { _ANSWER_COLORS, _QUEST_TYPES } from "../../configs";

const initialAnswerInfo = {
  text: "",
  correct: false,
  warnNoText: false,
  animation: null,
};

const initAnswers = (editor, existedAns) => {
  editor.answersById = {};
  existedAns.forEach((ans, i) => {
    editor.answersById[i + 1] = {
      ...initialAnswerInfo,
      ...(ans || {}),
      id: i + 1,
      color: _ANSWER_COLORS[i],
    };
  });
  editor.allAnswerIds = [1, 2, 3, 4];
};

const initialEditor = {
  id: 0,
  mode: null, // | "old"
  questType: null,
  multiCorrect: false,
  question: null,
  answersById: {},
  allAnswerIds: [],
  timeLimit: 30,
};

const initialState = {
  _id: "",
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
      const { _id, type, name, tags } = action.payload;
      state._id = _id;
      state.type = type;
      state.name = name;
      state.tags = tags;
    },
    CLOSE_CREATOR_FE: () => {
      return initialState;
    },
    OPEN_EDITOR: ({ editor }, action) => {
      const questType = action.payload;
      editor.mode = "new";
      editor.questType = questType;
      editor.question = "";
      switch (questType) {
        case _QUEST_TYPES.multipleChoice: {
          initAnswers(editor, [...Array(4)]);
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
      const { id, time } = action.payload;
      if (id && state.savedQuests[id]) {
        state.savedQuests[id].timeLimit = time;
      } else {
        state.editor.timeLimit = time;
      }
    },
    SAVE_QUEST_FE: (state, action) => {
      const id = action.payload;
      const { mode, allAnswerIds, answersById, ...rest } = state.editor;
      const answers = allAnswerIds.map((ansId) => {
        const { text, correct } = answersById[ansId];
        return { text, correct };
      });
      if (mode === "new") {
        state.savedQuests.allIds.push(id);
      }
      state.savedQuests.byId[id] = {
        ...rest,
        id,
        answers,
      };
      state.editor = initialEditor;
    },
    EDIT_QUEST: (state, action) => {
      const id = action.payload;
      const { answers, ...rest } = state.savedQuests.byId[id];
      state.editor = {
        ...rest,
        mode: "old",
        id,
      };
      initAnswers(state.editor, answers);
    },
    DUPLICATE_QUEST: ({ savedQuests }, action) => {
      const { id, ...rest } = savedQuests.byId[action.payload];
      const newId = Date.now();
      savedQuests.byId[newId] = {
        id: newId,
        ...rest,
      };
      savedQuests.allIds.push(newId);
    },
    DELETE_QUEST_FE: ({ savedQuests }, action) => {
      const id = action.payload;
      delete savedQuests.byId[id];
      savedQuests.allIds = savedQuests.allIds.filter(
        (questId) => questId !== id
      );
    },
  },
});

export const actions = creatorSlice.actions;

export default creatorSlice.reducer;
