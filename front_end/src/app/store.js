import { configureStore } from "@reduxjs/toolkit";
import { setsOnExploreApi } from "./thunks";
import uiReducer from "./uiSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
    [setsOnExploreApi.reducerPath]: setsOnExploreApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(setsOnExploreApi.middleware),
});

export default store;
