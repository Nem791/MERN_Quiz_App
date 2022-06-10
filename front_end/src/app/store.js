import { configureStore } from "@reduxjs/toolkit";
import { backendApi } from "./thunks";
import uiReducer from "./uiSlice";
import userReducer from "./userSlice";
import creatorReducer from "./creatorSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
    creator: creatorReducer,
    [backendApi.reducerPath]: backendApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(backendApi.middleware),
});

export default store;
