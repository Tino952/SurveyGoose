import { useEffect } from "react";
import MySurveys from "../../components/MySurveys/MySurveys";

const MySurveysPage = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  return <MySurveys />;
};

export default MySurveysPage;
