import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setQuestionActions } from "../../store";
import {
  surveyActions,
  savedSurveyActions,
  successHeaderActions,
} from "../../store";
import styles from "./SavedSurvey.module.css";

const SavedSurvey = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const surveyId = useSelector((state) => state.survey.id);
  let currSurvey = useSelector((state) => state.survey);
  const clickHandler = (id, type) => {
    navigate(`/newsurvey=${surveyId}/${type}/addquestion=${id}`);
    dispatch(setQuestionActions.setQuestion(id));
  };
  const deleteHandler = (id) => {
    dispatch(surveyActions.deleteQuestion(id));
  };

  const saveSurveyHandler = () => {
    dispatch(savedSurveyActions.saveSurvey(currSurvey));
    dispatch(successHeaderActions.toggleSurvey());
    setTimeout(() => {
      dispatch(successHeaderActions.toggleSurvey());
    }, 2000);
  };


  const survey = useSelector((state) => state.survey.questions);
  const questions = (
    <ul className={styles.list}>
      {survey.map((question) => (
        <span key={question.id} className={styles.listElementContainer}>
          <li
            className={styles.listElement}
            id={question.id}
            onClick={clickHandler.bind(null, question.id, question.type)}
          >
            <div className={styles.listElementInner}>
              <div className={styles.cardTitle}>{question.question}</div>
              <ul className={styles.cardAnswerList}>
                {question.answers.map((answer) => (
                  <li key={answer.id} className={styles.cardAnswerItem}>
                    <span>{answer.letter})</span>
                    <span className={styles.cardAnswerInput}>
                      <span className={styles.cardAnswerText}>
                        {answer.text}
                      </span>
                      <span className={styles.cardAnswerTextDelete} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          <span
            className={styles.delete}
            onClick={deleteHandler.bind(null, question.id)}
          >
            x
          </span>
        </span>
      ))}
      <span className={styles.saveSurvey} onClick={saveSurveyHandler}>
        Save Survey
      </span>
    </ul>
  );

  return (
    <>
      {survey.length > 0 && (
        <header className={styles.header}>{questions}</header>
      )}
    </>
  );
};

export default SavedSurvey;
