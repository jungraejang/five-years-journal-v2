import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import TokenService from "../services/token.service";
import questionService from "../services/question.service";

const initialState = { todayQuestion: null, message: "" };

export const getTodayQuestion = createAsyncThunk(
  "question/getTodayQuestion",
  async ({ postedBy }, { rejectWithValue }) => {
    try {
      let res = await questionService.getTodayQuestion({
        postedBy,
      });
      return res.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const saveAnswer = createAsyncThunk(
  "question/saveAnswer",
  async ({ answer, postedAt, postedBy }, { rejectWithValue }) => {
    try {
      const res = await questionService.saveAnswer({
        answer,
        postedAt,
        postedBy,
      });
      return res.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setTodayQuestion: (state, action) => {
      state.todayQuestion = action.payload;
    },
  },
  extraReducers: {
    [getTodayQuestion.fulfilled]: (state, action) => {
      console.log("today question fulfilled", action.payload);
      state.message = action.payload.message;
      // state.isLoggedIn = true;
      state.todayQuestion = action.payload;
    },
    [getTodayQuestion.rejected]: (state, action) => {
      // state.user = action.payload.message;
      // state.isLoggedIn = true;
      state.message = action.payload.message;
    },
    [saveAnswer.fulfilled]: (state, action) => {
      console.log("save ans payload", action.payload);
      // state.user = action.payload.message;
      // state.isLoggedIn = true;
      state.message = action.payload.message;
    },
    [saveAnswer.rejected]: (state, action) => {
      // state.user = action.payload.message;
      // state.isLoggedIn = true;
      state.message = action.payload.message;
    },
  },
});

export const { setTodayQuestion, setImage } = questionSlice.actions;

export const selectTodayQuestion = (state) => state.question.todayQuestion;
export const selectMessage = (state) => state.question.message;

export default questionSlice.reducer;
