import styles from "./Results.module.css";
import sideBarStyles from "./SideBar.module.css";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import BarChart from "./BarChart";
import ChartBottom from "./ChartBottom";
import { useState } from "react";

const Results = () => {
  const { id } = useParams();
  const [startCurrQuestions, setStartCurrentQuestions] = useState(0);
  let savedSurveys = useSelector((state) => state.savedSurveys.deployedSurveys);
  let selectedSurvey = id && savedSurveys.find((survey) => survey.id === id);
  let currentSurveyPortion = [];
  let surveyLength = 0;
  if (selectedSurvey && selectedSurvey.results) {
    surveyLength = selectedSurvey.results.length;
    currentSurveyPortion = selectedSurvey.results.slice(
      startCurrQuestions,
      startCurrQuestions + 3
    );
  }

  const scrollUpHandler = () => {
    setStartCurrentQuestions((prevValue) => {
      return ++prevValue;
    });
  };

  const scrollDownHandler = () => {
    setStartCurrentQuestions((prevValue) => {
      return --prevValue;
    });
  };

  return (
    <div className={styles.container}>
      <div className={sideBarStyles.innerContainer}>
        <h4>{selectedSurvey ? selectedSurvey.title : "No Survey Selected"}</h4>
        {selectedSurvey && (
          <div className={styles.resultsContainer}>
            <button
              onClick={scrollDownHandler}
              className={`${styles.next} ${
                startCurrQuestions === 0 && styles.disabled
              }`}
            >
              &lt;
            </button>
            <ul className={styles.results}>
              {currentSurveyPortion.map((question) => (
                <div
                  key={question[0].questionId}
                  className={styles.chartContainer}
                >
                  <li className={styles.chart}>
                    <BarChart answers={question.slice(1)} />
                  </li>
                  <ChartBottom
                    results={selectedSurvey.results}
                    question={question}
                  />
                </div>
              ))}
            </ul>
            <button
              onClick={scrollUpHandler}
              className={`${styles.next} ${
                startCurrQuestions + 3 >= surveyLength && styles.disabled
              }`}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
