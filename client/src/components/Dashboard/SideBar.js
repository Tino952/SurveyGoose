import styles from "./SideBar.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SideBar = () => {
  const deployedSurveys = useSelector(
    (state) => state.savedSurveys.deployedSurveys
  );
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h4>Deployed Surveys</h4>
        <ul>
          {deployedSurveys.map((survey) => (
            <li key={survey.id}>
              <Link to={`${survey.id}`}>{survey.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default SideBar;
