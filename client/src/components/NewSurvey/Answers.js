import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import icon from "../../assets/add.png";
import FormAction from "../UI/FormAction";
import styles from "./Answers.module.css";

const QuestionField = (props) => {
  const [answerArray, setanswerArray] = useState([]);
  const selectedQuestionId = useSelector((state) => state.setQuestion.id);
  const allSurveyData = useSelector((state) => state.survey.questions);
  const selectedSurveyData = allSurveyData.find(
    (element) => element.id === selectedQuestionId
  );

  const clear = props.clear;
  const reset = props.reset;

  useEffect(() => {
    if (clear) {
      setanswerArray([]);
      reset();
    }
  }, [clear, reset]);

  const fetchQuestion = useSelector((state) => state.setQuestion.active);
  useEffect(() => {
    if (selectedSurveyData && fetchQuestion) {
      let answerData = selectedSurveyData.answers;
      setanswerArray(answerData);
    }
  }, [selectedSurveyData, fetchQuestion]);

  const clickHandler = () => {
    let id = `a${String(Math.random() * 10)}`;
    setanswerArray((prevArray) => {
      if (prevArray.length === 0) {
        return [{ letter: "a", id: id, text: "" }];
      }
      let lastItem = prevArray.slice(-1)[0];
      let lastLetter = lastItem.letter;
      let charNum = lastLetter.charCodeAt(0);
      let nextCharNum = ++charNum;
      let nextLetter = String.fromCharCode(nextCharNum);
      let newArray = prevArray.concat({ letter: nextLetter, id: id, text: "" });
      return newArray;
    });
  };

  const deleteQuestionHandler = (id) => {
    setanswerArray((prevArray) => {
      let filteredArray = prevArray.filter((element) => element.id !== id);
      let start = "a";
      let newArray = [];
      for (let element of filteredArray) {
        let newElement = { ...element, letter: start };
        newArray.push(newElement);
        let charNum = start.charCodeAt(0);
        let nextCharNum = ++charNum;
        start = String.fromCharCode(nextCharNum);
      }
      return newArray;
    });
  };

  const saveHandler = (id, input) => {
    setanswerArray((prevArray) => {
      let newArray = [...prevArray];
      for (let element of newArray) {
        if (element.id === id) {
          let newElement = { ...element, text: input };
          let index = prevArray.indexOf(element);
          newArray.splice(index, 1, newElement);
        }
      }
      return newArray;
    });
  };

  const saveAnswers = props.saveAnswers;

  useEffect(() => {
    saveAnswers(answerArray);
  }, [saveAnswers, answerArray]);

  const listItems =
    answerArray.length > 0 &&
    answerArray.map((answer) => (
      <div key={answer.id}>
        <FormAction
          alternate={true}
          type={"text"}
          id={answer.id}
          title={answer.letter + ")"}
          deleteQuestion={deleteQuestionHandler}
          save={saveHandler}
          content={answer.text}
        />
      </div>
    ));

  return (
    <>
      <div className={styles.answers}>{listItems}</div>
      <div className={styles.iconContainer}>
        <span className={styles.icon} onClick={clickHandler}>
          <img className={styles.image} src={icon} alt="plus icon" />
          <span>Add Answer</span>
        </span>
      </div>
    </>
  );
};

export default QuestionField;
