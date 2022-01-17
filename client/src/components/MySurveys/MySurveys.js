import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { surveyActions } from "../../store";
import { savedSurveyActions } from "../../store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./MySurveys.module.css";
import Button from "../UI/Button";
import goose from "../../assets/logo-single.png";
import Modal from "../UI/Modal";

const MySurveys = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const mySurveys = useSelector((state) => state.savedSurveys.surveys);
  const sortedSurveys = [...mySurveys].sort((s1, s2) => {
    if (s1.title < s2.title) {
      // sort s1 before s2
      return -1;
    }
    if (s1.title > s2.title) {
      return 1;
    }
    return 0;
  });
  const navNewSurveyHandler = () => {
    dispatch(surveyActions.setTitle(""));
    dispatch(surveyActions.setId(""));
    dispatch(surveyActions.setDescription(""));
    dispatch(surveyActions.clear());
    navigate("/newsurvey=");
  };

  const editSurveyHandler = (id) => {
    let selectedSurvey = mySurveys.find((survey) => survey.id === id);
    dispatch(surveyActions.setSurvey(selectedSurvey));
    if (selectedSurvey.deployed.status) {
      setModal(true);
    } else {
      navigate(`/newsurvey=${id}`);
    }
  };

  const deleteSurveyHandler = (id) => {
    dispatch(savedSurveyActions.deleteSurvey(id));
  };

  const deploySurveyHandler = (surveyId, deployStatus) => {
    if (!deployStatus) {
      const deployKey = uuid().substring(0, 8);
      dispatch(savedSurveyActions.setDeploy({ surveyId, deployKey }));
    } else {
      dispatch(savedSurveyActions.setDeploy({ surveyId }));
    }
  };

  const dashboardHandler = () => {
    navigate("/mydashboard/");
  };

  const closeModalHandler = () => {
    setModal(false);
  };

  const navigateHandler = (id) => {
    navigate(`/newsurvey=${id}`);
  };

  return (
    <>
      <div className={styles.container}>
        {sortedSurveys.length === 0 && (
          <h2 className={styles.h2}>No Surveys Yet!</h2>
        )}
        <ol className={styles.ul}>
          {sortedSurveys.length > 0 &&
            sortedSurveys.map((survey) => (
              <li key={survey.id}>
                <div className={styles.listElemContainer}>
                  <img
                    className={styles.image}
                    src={goose}
                    alt="survey_goose-logo"
                  />
                  <div className={styles.innerContainer}>
                    <span>
                      <h3>{survey.title}</h3>
                    </span>
                    <span>
                      <div
                        className={`${styles.button} ${styles.edit}`}
                        onClick={editSurveyHandler.bind(null, survey.id)}
                      >
                        Edit Survey
                      </div>
                      <div
                        className={`${styles.button} ${styles.delete}`}
                        onClick={deleteSurveyHandler.bind(null, survey.id)}
                      >
                        Delete Survey
                      </div>
                      <div
                        className={`${styles.button} ${styles.deploy}`}
                        onClick={deploySurveyHandler.bind(
                          null,
                          survey.id,
                          survey.deployed.status
                        )}
                      >
                        {survey.deployed.status
                          ? "Undeploy Survey"
                          : "Deploy Survey"}
                      </div>
                    </span>
                    <span>
                      <span className={`${styles.button} ${styles.status}`}>
                        Deploy Status:
                      </span>
                      <span>
                        {survey.deployed.status ? (
                          <span>
                            Deployed: (key:{" "}
                            <strong>{survey.deployed.key}</strong>)
                          </span>
                        ) : (
                          "Undeployed"
                        )}
                      </span>
                    </span>
                    {survey.deployed.status && (
                      <span
                        onClick={dashboardHandler}
                        className={`${styles.button} ${styles.dashboard}`}
                      >
                        Go to Dashboard
                      </span>
                    )}
                  </div>
                </div>
                {modal && (
                  <Modal
                    closeModal={closeModalHandler}
                    navigate={navigateHandler.bind(null, survey.id)}
                  ></Modal>
                )}
              </li>
            ))}
        </ol>
        <div className={styles.buttonContainer}>
          <Button color="g" onClick={navNewSurveyHandler}>
            New Survey
          </Button>
        </div>
      </div>
    </>
  );
};

export default MySurveys;
