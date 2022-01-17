import { createSlice } from "@reduxjs/toolkit";

const initialState = { questionState: false, surveyState: false };

const successHeader = createSlice({
  name: "surveyInput",
  initialState: initialState,
  reducers: {
    toggleQuestion(state) {
      state.questionState = !state.questionState;
    },
    toggleSurvey(state) {
      state.surveyState = !state.surveyState;
    },
  },
});

export default successHeader;
