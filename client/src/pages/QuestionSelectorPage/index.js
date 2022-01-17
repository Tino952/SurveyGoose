import { useEffect } from "react";
import QuestionSelector from "../../components/NewSurvey/QuestionSelector";

const QuestionTypePage = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);
  return <QuestionSelector />;
};

export default QuestionTypePage;
