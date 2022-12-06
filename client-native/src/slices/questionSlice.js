import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import TokenService from "../services/token.service";
import questionService from "../services/question.service";

const initialState = {
  todayQuestion: null,
  message: "",
  fetchedQuestion: null,
};

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;

export const getQuestion = createAsyncThunk(
  "question/getQuestion",
  async ({ postedBy, today, day, month }, { rejectWithValue }) => {
    console.log("get question", day, month, postedBy);
    try {
      let res = await questionService.getQuestion({
        postedBy,
        today,
        day,
        month,
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
    [getQuestion.fulfilled]: (state, action) => {
      //check if fetched question has same date as today, if so save them in different state (fetchedQuestion)
      if (action.payload.data.day != dd || action.payload.data.month != mm) {
        state.fetchedQuestion = action.payload;
      } else {
        state.todayQuestion = action.payload;
      }
      state.message = action.payload.message;
      // state.isLoggedIn = true;
    },
    [getQuestion.rejected]: (state, action) => {
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
export const selectFetchedQuestion = (state) => state.question.fetchedQuestion;

export default questionSlice.reducer;
