import { configureStore } from "@reduxjs/toolkit";
import { setOnExploreApi } from "./thunks";
import uiReducer from "./uiSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
    [setOnExploreApi.reducerPath]: setOnExploreApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(setOnExploreApi.middleware),
});

export default store;
