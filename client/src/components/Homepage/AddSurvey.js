import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { surveyActions } from "../../store";
import icon from "../../assets/add.png";
import styles from "./AddSurvey.module.css";

const AddSurvey = () => {
  const [imgClass, setImgClass] = useState("");
  const [showSurveyKey, setShowSurveyKey] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deployedSurveys = useSelector(
    (state) => state.savedSurveys.deployedSurveys
  );

  useEffect(() => {
    dispatch(surveyActions.setTitle(""));
    dispatch(surveyActions.setId(""));
    dispatch(surveyActions.setDescription(""));
    dispatch(surveyActions.clear());
  }, [dispatch]);

  const clickHandler = () => {
    setImgClass(styles.spin);
    setTimeout(() => {
      navigate("/newsurvey=");
    }, 800);
  };

  const fillSurveyHandler = (e) => {
    e.preventDefault();
    let input = e.target[0].value;
    for (let survey of deployedSurveys) {
      survey.deployed.key === input && navigate(`/fillsurvey=${input}`);
    }
  };

  const expandFillSurveyHandler = () => {
    setShowSurveyKey(true);
  };

  return (
    <>
      <div className={styles.icon} onClick={clickHandler}>
        <img className={imgClass} src={icon} alt="plus icon" />
        <span>New Survey</span>
      </div>
      <span style={{ display: "inline-block" }}>
        <form className={styles.form} onSubmit={fillSurveyHandler}>
          {showSurveyKey ? (
            <h4 className={styles.h4}>Enter Survey Key:</h4>
          ) : (
            <h4
              onClick={expandFillSurveyHandler}
              className={`${styles.h4} ${styles.link}`}
            >
              Here to fill out a Survey?
            </h4>
          )}
          {showSurveyKey && (
            <>
              <input id="fill_survey"></input>
              <div className={styles.buttonContainer}>
                <button className={styles.button}>Go</button>
              </div>
            </>
          )}
        </form>
      </span>
    </>
  );
};

export default AddSurvey;
