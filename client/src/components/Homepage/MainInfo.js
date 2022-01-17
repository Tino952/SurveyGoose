import styles from "./MainInfo.module.css";
import AddSurvey from "./AddSurvey";
import Clipboard from "./Canvas";
import "../../index.css";

const MainInfo = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1>Create a Survey in Under 1 Minute</h1>
        <br />
        <div>
          <h2>
            Discover what drives your customers
            <span className={styles.period_blue}>.</span>
          </h2>
          <h2>
            Sign up to access your personal analytics dashboard
            <span className={styles.period_green}>.</span>
          </h2>
        </div>
        <AddSurvey />
      </div>
      <Clipboard />
    </div>
  );
};

export default MainInfo;
