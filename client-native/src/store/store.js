import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import themeReducer from "../slices/themeSlice";
import questionReducer from "../slices/questionSlice";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    question: questionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});
