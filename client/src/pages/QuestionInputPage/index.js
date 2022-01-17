import { useEffect } from "react";
import QuestionForm from "../../components/NewSurvey/QuestionInput";

const QuestionInputPage = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);
  return <QuestionForm />;
};

export default QuestionInputPage;
