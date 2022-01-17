import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { savedSurveyActions } from "../../store";
import Button from "../UI/Button";
import styles from "./FillSurvey.module.css";

const FillSurvey = () => {
  const [count, setCount] = useState(-1);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deployedSurveyKey = params.surveykey;
  const deployedSurveys = useSelector(
    (state) => state.savedSurveys.deployedSurveys
  );
  const mySurvey = deployedSurveys.find(
    (survey) => survey.deployed.key === deployedSurveyKey
  );

  const myQuestions = mySurvey ? mySurvey.questions : null;

  let counter = 0;

  myQuestions && myQuestions.forEach((question) => counter++);

  const nextClickCounter = () => {
    selectedAnswer.length > 0 && saveAnswer();
    setCount((prevCount) => ++prevCount);
    setSelectedAnswer([]);
  };
  const prevClickCounter = () => {
    setCount((prevCount) => --prevCount);
    setSelectedAnswer([]);
  };
  const finishHandler = () => {
    selectedAnswer.length > 0 && saveAnswer();
    navigate("/");
  };

  const toggleHandler = (answerObj) => {
    let { answerId } = answerObj;
    let updatedAnswerArray;
    if (myQuestions[count].multipleAnswers) {
      let existingAnswer = selectedAnswer.find(
        (element) => element.answerId === answerId
      );
      if (existingAnswer) {
        updatedAnswerArray = selectedAnswer.filter(
          (element) => element.answerId !== answerId
        );
      }
      updatedAnswerArray = selectedAnswer.concat(answerObj);
    } else {
      if (
        selectedAnswer.length > 0 &&
        selectedAnswer[0].answerId === answerId
      ) {
        updatedAnswerArray = [];
      } else {
        updatedAnswerArray = [answerObj];
      }
    }

    setSelectedAnswer(updatedAnswerArray);
  };

  const saveAnswer = () => {
    let questionObj = {
      questionId: myQuestions[count].id,
      questionText: myQuestions[count].question,
    };
    let answerObj = selectedAnswer;
    let surveyKey = deployedSurveyKey;
    const sendObj = { surveyKey, questionObj, answerObj };
    dispatch(savedSurveyActions.addAnswer(sendObj));
  };

  return (
    <>
      {mySurvey && (
        <div className={styles.container}>
          <span className={`${styles.title} ${styles.span}`}>
            {mySurvey.title}
          </span>
          {count === -1 && (
            <>
              <span className={styles.span}>{mySurvey.description}</span>
              <span className={styles.span}>
                <Button onClick={nextClickCounter}>Start!</Button>
              </span>
            </>
          )}
          {myQuestions[count] && (
            <>
              <span>
                Question {count + 1} of {counter}
              </span>
              <span>{myQuestions[count].question}</span>
              <ul className={styles.answers}>
                {myQuestions[count].answers.map((answer) => (
                  <li key={answer.id} className={styles.answerContainer}>
                    <div className={styles.letterContainer}>
                      <span>{answer.letter})</span>
                    </div>
                    <span
                      onClick={toggleHandler.bind(null, {
                        answerId: answer.id,
                        answerText: answer.text,
                        answerLetter: answer.letter,
                      })}
                      className={
                        selectedAnswer.find(
                          (element) => element.answerId === answer.id
                        )
                          ? `${styles.answer} ${styles.selected}`
                          : styles.answer
                      }
                    >
                      {answer.text}
                    </span>
                  </li>
                ))}
              </ul>
              <div className={styles.buttonOuterContainer}>
                <span className={styles.buttonContainer}>
                  <span className={styles.span}>
                    <Button onClick={prevClickCounter}>Back</Button>
                  </span>
                  <span className={styles.span}>
                    {myQuestions[count + 1] ? (
                      <Button onClick={nextClickCounter}>Next</Button>
                    ) : (
                      <Button onClick={finishHandler}>Finish</Button>
                    )}
                  </span>
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default FillSurvey;
