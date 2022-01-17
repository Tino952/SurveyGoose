import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SurveyModal from "../UI/SurveyModal";
import styles from "./QuestionSelector.module.css";

const QuestionSelector = () => {
  const title = useSelector((state) => state.survey.title);
  const surveyid = useSelector((state) => state.survey.id);
  const navigate = useNavigate();
  const questionSelector = useRef();
  const [questionType, setQuestionType] = useState("mchoice");

  const questionSelectorHandler = () => {
    setQuestionType(questionSelector.current.value);
  };

  const nextPageHandler = () => {
    navigate(`/newsurvey=${surveyid}/${questionType}/addquestion`);
  };

  const prevPageHandler = () => {
    navigate(`/newsurvey=${surveyid}`);
  };

  return (
    <SurveyModal
      title={title}
      questionType={questionType}
      next={nextPageHandler}
      previous={prevPageHandler}
    >
      <div className={styles.container}>
        <form className={styles.form}>
          <div className={styles.actions}>
            <h3 className={styles.header}>Select a question type</h3>
            <select
              name="questionType"
              id="questionType"
              className={styles.selector}
              ref={questionSelector}
              onChange={questionSelectorHandler}
            >
              <option value="mchoice">Multiple Choice</option>
              <option value="rscale">Rating Scale</option>
              <option value="likert">Likert Scale</option>
            </select>
          </div>
        </form>
      </div>
    </SurveyModal>
  );
};

export default QuestionSelector;
