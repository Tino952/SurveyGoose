import { configureStore } from "@reduxjs/toolkit";
import surveySlice from "./currentSurvey";
import successHeader from "./successHeader";
import setQuestion from "./setQuestion";
import savedSurveys from "./savedSurvey";

const store = configureStore({
  reducer: {
    survey: surveySlice.reducer,
    successHeader: successHeader.reducer,
    setQuestion: setQuestion.reducer,
    savedSurveys: savedSurveys.reducer,
  },
});

export const surveyActions = surveySlice.actions;
export const successHeaderActions = successHeader.actions;
export const setQuestionActions = setQuestion.actions;
export const savedSurveyActions = savedSurveys.actions;
export default store;
