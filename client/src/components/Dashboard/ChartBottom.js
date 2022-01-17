import { useState } from "react";
import styles from "./ChartBottom.module.css";

const ChartBottom = ({ results, question }) => {
  const [showInfo, setShowInfo] = useState(false);
  const hoverOnHandler = () => {
    setShowInfo(true);
  };
  const hoverOutHandler = () => {
    setShowInfo(false);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.chartBottom}
        onMouseOver={hoverOnHandler}
        onMouseOut={hoverOutHandler}
      >{`Question ${results.indexOf(question) + 1}`}</div>
      {showInfo && (
        <div className={styles.infoContainer}>
          <div>{question[0].questionText}</div>
        </div>
      )}
    </div>
  );
};

export default ChartBottom;
