import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { editorMode: false, message: "", editorText: "" };

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setEditorMode: (state, action) => {
      state.editorMode = action.payload;
    },
    onEditorTextChange: (state, action) => {
      state.editorText = action.payload;
    },
  },
  //   extraReducers: {
  //     [getTodayQuestion.fulfilled]: (state, action) => {
  //       // state.user = action.payload.message;
  //       // state.isLoggedIn = true;
  //       state.todayQuestion = action.payload;
  //     },
  //     [getTodayQuestion.rejected]: (state, action) => {
  //       // state.user = action.payload.message;
  //       // state.isLoggedIn = true;
  //       state.message = action.payload.message;
  //     },
  //   },
});

export const { setEditorMode, onEditorTextChange } = editorSlice.actions;

export const selectEditorMode = (state) => state.editor.editorMode;
export const selectMessage = (state) => state.editor.message;
export const selectEditorText = (state) => state.editor.editorText;
export default editorSlice.reducer;
