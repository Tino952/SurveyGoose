import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  title: "",
  description: "",
  questions: [],
  deployed: { status: false, key: "" },
};

const surveySlice = createSlice({
  name: "surveyInput",
  initialState: initialState,
  reducers: {
    setId(state, action) {
      let id = action.payload;
      state.id = id;
    },
    setTitle(state, action) {
      let data = action.payload;
      state.title = data;
    },
    setDescription(state, action) {
      let description = action.payload;
      state.description = description;
    },
    saveQuestion(state, action) {
      let newQuestion = action.payload;
      let newQuestionId = newQuestion.id;
      let newQuestionArray;
      let currentQuestionArray = state.questions;
      let existingQuestion = currentQuestionArray.find(
        (element) => element.id === newQuestionId
      );
      if (existingQuestion) {
        let updatedQuestion = {
          id: existingQuestion.id,
          question: newQuestion.question,
          answers: newQuestion.answers,
          type: newQuestion.type,
          multipleAnswers: newQuestion.multipleAnswers,
        };
        let existingQuestionIndex =
          currentQuestionArray.indexOf(existingQuestion);
        newQuestionArray = currentQuestionArray;
        newQuestionArray[existingQuestionIndex] = updatedQuestion;
      } else {
        newQuestionArray = [...state.questions, { ...newQuestion }];
      }
      state.questions = newQuestionArray;
      localStorage.setItem("question", newQuestionArray);
    },
    deleteQuestion(state, action) {
      let questionId = action.payload;
      let currentQuestionArray = state.questions;
      let existingQuestion = currentQuestionArray.find(
        (element) => element.id === questionId
      );
      if (existingQuestion) {
        let newQuestionArray = currentQuestionArray.filter(
          (question) => question.id !== questionId
        );
        state.questions = newQuestionArray;
      }
    },
    clear(state) {
      state.questions = [];
    },
    setSurvey(state, action) {
      let data = action.payload;
      state.id = data.id;
      state.title = data.title;
      state.description = data.description;
      state.questions = data.questions;
      state.deployed = data.deployed;
    },
  },
});

export default surveySlice;
