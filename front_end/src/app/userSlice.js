import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
  },
  reducers: {
    LOGIN: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { LOGIN } = userSlice.actions;

export default userSlice.reducer;
