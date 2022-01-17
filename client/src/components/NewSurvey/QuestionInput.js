import { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { surveyActions } from "../../store";
import { setQuestionActions } from "../../store";
import { successHeaderActions } from "../../store";
import SurveyModal from "../UI/SurveyModal";
import Answers from "./Answers";
import FormAction from "../UI/FormAction";
import styles from "./QuestionInput.module.css";

const SurveyPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const questionInput = useRef();
  const navigate = useNavigate();
  const [answerArray, setAnswerArray] = useState([]);
  const [clearAnswers, setClearAnswers] = useState(false);
  const [multipleAnswers, setMultipleAnswers] = useState(false);
  const title = useSelector((state) => state.survey.title);
  const surveyId = useSelector((state) => state.survey.id);
  const selectedQuestionId = useSelector((state) => state.setQuestion.id);
  const selectedQuestionActive = useSelector(
    (state) => state.setQuestion.active
  );
  const allSurveyData = useSelector((state) => state.survey.questions);
  const selectedSurveyData = allSurveyData.find(
    (element) => element.id === selectedQuestionId
  );

  useEffect(() => {
    if (selectedSurveyData && selectedQuestionActive) {
      if (questionInput.current) {
        questionInput.current.value = selectedSurveyData.question;
      }
      setMultipleAnswers(selectedSurveyData.multipleAnswers);
    }
  }, [selectedQuestionActive, selectedSurveyData, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setQuestionActions.reset());
    };
  }, [dispatch]);

  let questionId;

  selectedQuestionActive
    ? (questionId = selectedQuestionId)
    : (questionId = `q${Math.random() * 10}`);

  const prevPageHandler = () => {
    navigate(`/newsurvey=${surveyId}/questiontype`);
  };

  const saveHandler = (overwrite) => {
    let question = questionInput.current.value;
    let emptyAnswers = true;
    answerArray.forEach((answer) => {
      if (answer.text.length > 0) {
        emptyAnswers = false;
      }
    });
    if (question.length === 0) {
      alert("Please enter a non-empty question");
      return;
    }
    if (emptyAnswers) {
      alert("Please enter non-empty answers only");
      return;
    }
    if (!overwrite) {
      questionId = `q${Math.random() * 10}`;
    }

    dispatch(
      surveyActions.saveQuestion({
        id: questionId,
        type: params.questiontype,
        question: question,
        answers: answerArray,
        multipleAnswers,
      })
    );
    dispatch(successHeaderActions.toggleQuestion());
    setTimeout(() => {
      dispatch(successHeaderActions.toggleQuestion());
    }, 2000);
    questionInput.current.value = "";
    setClearAnswers(true);
    navigate(`/newsurvey=${surveyId}/questiontype`);
  };

  const saveAnswerHandler = (answers) => {
    setAnswerArray(answers);
  };

  const resetClearAnswers = () => {
    setClearAnswers(false);
  };

  const saveMultipleAnswerStatusHandler = (status) => {
    setMultipleAnswers(status);
  };

  return (
    <>
      <SurveyModal
        title={title}
        last={true}
        previous={prevPageHandler}
        save={saveHandler}
        saveNew={selectedQuestionActive}
        multipleAnswers={params.questiontype === "mchoice"}
        saveMultipleAnswerStatus={saveMultipleAnswerStatusHandler}
      >
        <div className={styles.container}>
          <FormAction
            id={questionId}
            type="text"
            title="Question"
            ref={questionInput}
          />
          <Answers
            saveAnswers={saveAnswerHandler}
            clear={clearAnswers}
            reset={resetClearAnswers}
          />
        </div>
      </SurveyModal>
    </>
  );
};

export default SurveyPage;
