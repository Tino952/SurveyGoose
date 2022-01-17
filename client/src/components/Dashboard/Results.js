import styles from "./Results.module.css";
import sideBarStyles from "./SideBar.module.css";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import BarChart from "./BarChart";
import ChartBottom from "./ChartBottom";

const Results = () => {
  const { id } = useParams();
  let savedSurveys = useSelector((state) => state.savedSurveys.deployedSurveys);
  let selectedSurvey = id && savedSurveys.find((survey) => survey.id === id);
  return (
    <div className={styles.container}>
      <div className={sideBarStyles.innerContainer}>
        <h4>{selectedSurvey ? selectedSurvey.title : "No Survey Selected"}</h4>
        {selectedSurvey && (
          <ul className={styles.results}>
            {selectedSurvey.results.map((question) => (
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
        )}
      </div>
    </div>
  );
};

export default Results;
