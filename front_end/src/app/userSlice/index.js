import { createSlice } from "@reduxjs/toolkit";
import { LOGIN, SIGNUP } from "./thunks";

const userSlice = createSlice({
  name: "user",
  initialState: {
    _id: null,
    name: "",
    reqError: "",
    reqPending: false,
  },
  reducers: {
    LOGOUT: (state) => {
      state.name = "";
      localStorage.removeItem("token");
    },
    RESET_ERROR: (state) => {
      state.reqError = "";
    },
    SNEAKIN: (state) => {
      state.name = "Huan";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LOGIN.fulfilled, (state, action) => {
        login(state, action.payload);
      })
      .addCase(LOGIN.pending, (state) => {
        state.reqPending = true;
      });
    builder
      .addCase(SIGNUP.fulfilled, (state, action) => {
        // login(state, action.payload);
        state.reqError = "";
        state.reqPending = false;
      })
      .addCase(SIGNUP.pending, (state) => {
        state.reqPending = true;
      });
  },
});

function login(state, res) {
  if (res.error) {
    state.reqError = res.error;
  } else {
    const { _id, name, token } = res;
    state._id = _id;
    state.name = name;
    state.reqError = "";
    localStorage.setItem("token", token);
  }
  state.reqPending = false;
}

export const { LOGOUT, RESET_ERROR, SNEAKIN } = userSlice.actions;

export default userSlice.reducer;
