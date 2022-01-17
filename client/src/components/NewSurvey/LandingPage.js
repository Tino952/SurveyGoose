import { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { surveyActions } from "../../store";
import SurveyModal from "../UI/SurveyModal";
import FormAction from "../UI/FormAction";
import styles from "./LandingPage.module.css";

let myTimeout;

const SurveyIntro = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const titleInput = useRef();
  const descriptionInput = useRef();
  const [title, setTitle] = useState();
  const currId = params.surveyid;
  let storedTitle = useSelector((state) => state.survey.title);
  let storedDescription = useSelector((state) => state.survey.description);

  useEffect(() => {
    if (storedTitle) setTitle(storedTitle);
    if (titleInput.current && storedTitle)
      titleInput.current.value = storedTitle;
    if (descriptionInput.current && storedDescription)
      descriptionInput.current.value = storedDescription;
  }, [storedTitle, storedDescription]);

  const nextPageHandler = () => {
    let title = titleInput.current.value;
    if (title.length === 0) {
      alert("Please enter a survey title");
      return;
    }
    if (!currId) {
      const id = `s${Math.random() * 10}`;
      dispatch(surveyActions.setId(id));
      navigate(`/newsurvey=${id}/questiontype`);
    } else {
      navigate(`/newsurvey=${currId}/questiontype`);
    }
  };

  const titleHandler = (e) => {
    let title = e.target.value;
    if (window.activeTimer) {
      window.clearTimeout(myTimeout);
    }
    window.activeTimer = true;
    myTimeout = window.setTimeout(() => {
      dispatch(surveyActions.setTitle(title));
      setTitle(title);
      window.activeTimer = false;
    }, 1000);
  };

  useEffect(() => {
    let title = titleInput.current;
    return () => {
      if (window.activeTimer) {
        window.clearTimeout(myTimeout);
        dispatch(surveyActions.setTitle(title.value));
      }
    };
  }, [dispatch]);

  const descriptionHandler = (e) => {
    let description = e.target.value;
    dispatch(surveyActions.setDescription(description));
  };

  return (
    <>
      <SurveyModal
        title={title ? title : "New Survey"}
        first={true}
        next={nextPageHandler}
      >
        <form className={styles.form}>
          <label className={styles.label} htmlFor="title">
            Title
          </label>
          <FormAction
            type={"text"}
            id={"title"}
            placeholder={"Survey_1"}
            required={true}
            ref={titleInput}
            onKeyUp={titleHandler}
          />
          <div className={styles.actions}>
            <label className={styles.label} htmlFor="description">
              Description
            </label>
            <textarea
              className={styles.textarea}
              id="description"
              name="description"
              ref={descriptionInput}
              placeholder={
                "With this survey we hope to better understand how satisifed you are with your recent stay at The Continental."
              }
              onKeyUp={descriptionHandler}
            ></textarea>
          </div>
        </form>
      </SurveyModal>
    </>
  );
};

export default SurveyIntro;
