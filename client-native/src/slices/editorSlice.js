import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  editorMode: false,
  message: "",
  editorText: "",
  image: null,
};

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
    setImage: (state, action) => {
      state.image = action.payload;
    },
  },
});

export const { setEditorMode, onEditorTextChange, setImage } =
  editorSlice.actions;

export const selectEditorMode = (state) => state.editor.editorMode;
export const selectMessage = (state) => state.editor.message;
export const selectEditorText = (state) => state.editor.editorText;
export const selectImage = (state) => state.editor.image;

export default editorSlice.reducer;
