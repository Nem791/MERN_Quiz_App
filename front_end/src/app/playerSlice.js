import { createSlice } from "@reduxjs/toolkit";

const dummySet = {
  title: "Liberation of Netherlands",
  img: "https://quizizz.com/media/resource/gs/quizizz-media/quizzes/b866dcde-01f7-4082-a6e9-72a8683e96a0?w=400&h=400",
  type: "lesson",
  plays: 419,
  quests: 20,
};

const playerSlice = createSlice({
  name: "player",
  initialState: {
    on: false,
    step: "",
  },
  reducers: {
    OPEN_PLAYER: (state, actions) => {
      state.on = true;
      // state.step = "";
    },
  },
});

export const { OPEN_PLAYER } = playerSlice.actions;

export default playerSlice.reducer;
