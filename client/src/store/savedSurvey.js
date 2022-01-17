import { createSlice } from "@reduxjs/toolkit";

const storedSavedSurveys = localStorage.getItem("savedSurveys");

let initStoredSurveys = storedSavedSurveys
  ? JSON.parse(storedSavedSurveys)
  : [];

const initialState = {
  surveys: initStoredSurveys,
  deployedSurveys: [],
};

const savedSurveys = createSlice({
  name: "savedSurveys",
  initialState: initialState,
  reducers: {
    saveSurvey(state, action) {
      let currSurvey = action.payload;
      let currSurveyId = currSurvey.id;
      let mySurveys = state.surveys;
      let existingSurvey = mySurveys.find(
        (element) => element.id === currSurveyId
      );
      let updatedSurveys = mySurveys;
      if (existingSurvey) {
        updatedSurveys = mySurveys.filter(
          (element) => element.id !== currSurveyId
        );
      }
      let finalSurveys = updatedSurveys.concat(currSurvey);
      state.surveys = finalSurveys;
      localStorage.setItem("savedSurveys", JSON.stringify(finalSurveys));
    },
    deleteSurvey(state, action) {
      let currSurveyId = action.payload;
      let mySurveys = state.surveys;
      let filteredSurveys = mySurveys.filter(
        (element) => element.id !== currSurveyId
      );
      state.surveys = filteredSurveys;
      localStorage.setItem("savedSurveys", JSON.stringify(filteredSurveys));
    },
    setDeploy(state, action) {
      let data = action.payload;
      let surveyId = data.surveyId;
      let deployKey = data.deployKey;
      let mySurveys = state.surveys;
      let findSurvey = mySurveys.find((element) => element.id === surveyId);
      let currentDeployedSurveys = state.deployedSurveys;
      if (findSurvey) {
        findSurvey.deployed.status = !findSurvey.deployed.status;
        if (deployKey) {
          findSurvey.deployed.key = deployKey;
          let findSurveyWithResultsArray = { ...findSurvey, results: [] };
          currentDeployedSurveys.push(findSurveyWithResultsArray);
        } else {
          findSurvey.deployed.key = "";
          let findDeployedSurvey = currentDeployedSurveys.find(
            (element) => element.id === surveyId
          );
          if (findDeployedSurvey) {
            currentDeployedSurveys = currentDeployedSurveys.filter(
              (element) => element.id !== surveyId
            );
          }
        }
        let filteredSurveys = mySurveys.filter(
          (element) => element.id !== surveyId
        );
        filteredSurveys.push(findSurvey);
        state.surveys = filteredSurveys;
        state.deployedSurveys = currentDeployedSurveys;
      }
    },
    addAnswer(state, action) {
      let data = action.payload;
      let surveyKey = data.surveyKey;
      let answerObj = data.answerObj;
      let questionObj = data.questionObj;
      let deployedSurveys = state.deployedSurveys;
      let findSurvey = deployedSurveys.find(
        (element) => element.deployed.key === surveyKey
      );
      if (findSurvey) {
        let questionId = questionObj.questionId;
        for (let answer of answerObj) {
          let findExistingQuestion = findSurvey.results.find(
            (question) => question[0].questionId === questionId
          );
          if (findExistingQuestion) {
            let questionIndex =
              findSurvey.results.indexOf(findExistingQuestion);
            let findExistingAnswer = findExistingQuestion.find(
              (elem) => elem.answerId === answer.answerId
            );
            if (findExistingAnswer) {
              let newCount = findExistingAnswer.count + 1;
              let answerIndex =
                findExistingQuestion.indexOf(findExistingAnswer);
              findExistingQuestion[answerIndex] = {
                ...answer,
                count: newCount,
              };
              findSurvey.results[questionIndex] = findExistingQuestion;
            } else {
              let updatedQuestion = [
                ...findExistingQuestion,
                { ...answer, count: 1 },
              ];
              findSurvey.results[questionIndex] = updatedQuestion;
            }
          } else {
            let newAnswer = { ...answer, count: 1 };
            let newQuestion = [{ ...questionObj }, newAnswer];
            findSurvey.results.push(newQuestion);
          }
        }
        let updatedDeployedSurveys = deployedSurveys.filter(
          (element) => element.deployed.key !== surveyKey
        );
        updatedDeployedSurveys.push(findSurvey);
        state.deployedSurveys = updatedDeployedSurveys;
      }
    },
  },
});

export default savedSurveys;
