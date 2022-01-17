import LandingPage from "../../components/NewSurvey/LandingPage";
import { useEffect } from "react";

const NewSurveyPage = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);
  return (
    <>
      <LandingPage />
    </>
  );
};

export default NewSurveyPage;
