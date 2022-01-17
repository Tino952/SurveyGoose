import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Button from "./Button";
import styles from "./SurveyModal.module.css";

const SurveyModal = (props) => {
  // setting refs
  let switchRef = useRef();

  // getting context
  const survey = useSelector((state) => state.survey.questions);
  const selectedQuestionActive = useSelector(
    (state) => state.setQuestion.active
  );
  const selectedQuestionId = useSelector((state) => state.setQuestion.id);
  const allSurveyData = useSelector((state) => state.survey.questions);
  const selectedSurveyData = allSurveyData.find(
    (element) => element.id === selectedQuestionId
  );

  //running effects
  useEffect(() => {
    if (selectedSurveyData && selectedQuestionActive) {
      if (switchRef.current) {
        switchRef.current.checked = selectedSurveyData.multipleAnswers;
      }
    }
  }, [selectedQuestionActive, selectedSurveyData]);

  // setting classes
  let firstButton = `${styles.navButtonContainer}`;
  let lastButton = `${styles.navButtonContainer}`;
  let hideFirst = false;
  let hideLast = false;
  if (props.first) {
    firstButton += ` ${styles.first}`;
    hideFirst = true;
  }
  if (props.last) {
    lastButton += ` ${styles.last}`;
    hideLast = true;
  }

  // Dynamic jsx code
  const saveButton = props.saveNew ? (
    <div className={`${styles.saveButtonContainer}`}>
      <Button onClick={props.save} color={"g"}>
        Overwrite
      </Button>
      <Button onClick={props.save.bind(null, false)} color={"g"}>
        Save New
      </Button>
    </div>
  ) : (
    <div className={styles.saveButtonContainer} onClick={props.save}>
      <Button color={"g"}>Save</Button>
    </div>
  );

  // handlers
  const onChangeHandler = (e) => {
    let status = e.target.checked;
    props.saveMultipleAnswerStatus(status);
  };

  return (
    <>
      <h2 className={styles.title}>{props.title}</h2>
      <div
        className={`${styles.modalWrapper} ${
          survey.length > 0 && styles.extraPadding
        }`}
      >
        <div className={styles.mobileNavBar}>
          <span
            onClick={props.previous}
            className={`${props.first && styles.firstMobileHide} ${
              props.last && styles.firstMobileMargin
            }`}
          >
            <strong>{"Back"}</strong>
          </span>
          <span
            onClick={props.next}
            className={`${props.last && styles.lastMobileHide} ${
              props.first && styles.lastMobileMargin
            }`}
          >
            <strong>{"Next"}</strong>
          </span>
        </div>
        <div className={styles.modalMain}>
          <div className={firstButton}>
            <Button hide={hideFirst} onClick={props.previous}>
              Back
            </Button>
          </div>
          <div className={styles.modalContainer}>
            {props.multipleAnswers && (
              <div className={styles.switchContainer}>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    onChange={onChangeHandler}
                    ref={switchRef}
                  />
                  <span className={styles.slider}></span>
                </label>
                <span className={styles.switchtext}>Multiple Answers</span>
              </div>
            )}
            <div className={styles.modal}>{props.children}</div>
          </div>

          <div className={lastButton}>
            <Button hide={hideLast} onClick={props.next}>
              Add Question
            </Button>
          </div>
        </div>
        {props.last && saveButton}
      </div>
    </>
  );
};

export default SurveyModal;
