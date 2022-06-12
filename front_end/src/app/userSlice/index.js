import { createSlice } from "@reduxjs/toolkit";
import { LOGIN, SIGNUP } from "./thunks";

const initialFormInfo = {
  reqError: "",
  reqPending: false,
  reqSuccess: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    _id: null,
    name: "",
    email: "",
    formInfo: initialFormInfo,
  },
  reducers: {
    RESET_USER_FORM: (state) => {
      state.formInfo = initialFormInfo;
    },
    LOGOUT: (state) => {
      state._id = null;
      state.name = "";
      state.email = "";
      localStorage.removeItem("token");
    },
    RESET_ERROR: (state) => {
      state.formInfo.reqError = "";
    },
    AUTO_LOGIN: (state, action) => {
      const { _id, name, email, token } = action.payload;
      state._id = _id;
      state.name = name;
      state.email = email;
      if (token) localStorage.setItem("token", token);
    },
    SNEAKIN: (state) => {
      state._id = 1;
      state.name = "Huan";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LOGIN.fulfilled, (state, action) => {
        login(state, action.payload);
      })
      .addCase(LOGIN.pending, (state) => {
        state.formInfo.reqPending = true;
      });
    builder
      .addCase(SIGNUP.fulfilled, (state, action) => {
        // login(state, action.payload);
        const { error } = action.payload;
        state.formInfo = {
          reqError: error || "",
          reqSuccess: !error,
          reqPending: false,
        };
      })
      .addCase(SIGNUP.pending, (state) => {
        state.formInfo.reqPending = true;
      });
  },
});

function login(state, res) {
  if (res.error) {
    state.formInfo.reqError = res.error;
  } else {
    const { user, token } = res;
    state._id = user._id;
    state.name = user.name;
    state.email = user.email;
    state.formInfo.reqError = "";
    localStorage.setItem("token", token);
  }
  state.formInfo.reqPending = false;
}

export const { RESET_USER_FORM, LOGOUT, RESET_ERROR, SNEAKIN, AUTO_LOGIN } =
  userSlice.actions;

export default userSlice.reducer;
