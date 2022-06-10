import { configureStore } from "@reduxjs/toolkit";
import { exploreSetsApi } from "./thunks";
import uiReducer from "./uiSlice";
import userReducer from "./userSlice";
import creatorReducer from "./creatorSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
    creator: creatorReducer,
    [exploreSetsApi.reducerPath]: exploreSetsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(exploreSetsApi.middleware),
});

export default store;
