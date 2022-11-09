import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import TokenService from "../services/token.service";
import questionService from "../services/question.service";

const initialState = { todayQuestion: null, message: "" };

export const getTodayQuestion = createAsyncThunk(
  "question/getTodayQuestion",
  async ({ postedBy }, { rejectWithValue }) => {
    console.log("posted by", postedBy);
    try {
      const res = await questionService.getTodayQuestion({
        postedBy,
      });
      console.log("resssss", res);
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
      // state.user = action.payload.message;
      // state.isLoggedIn = true;
      state.todayQuestion = action.payload;
    },
    [getTodayQuestion.rejected]: (state, action) => {
      // state.user = action.payload.message;
      // state.isLoggedIn = true;
      state.message = action.payload.message;
    },
  },
});

export const { setTodayQuestion } = questionSlice.actions;

export const selectTodayQuestion = (state) => state.question.todayQuestion;
export const selectMessage = (state) => state.question.message;

export default questionSlice.reducer;
