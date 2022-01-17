import styles from "./Bar.module.css";
import { useState } from "react";

const Bar = ({ value, max, text }) => {
  const [showInfo, setShowInfo] = useState(false);

  let barFillHeight = "0%";

  if (max > 0) {
    barFillHeight = Math.round((value / max) * 100) + "%";
  }

  const hoverOnHandler = () => {
    setShowInfo(true);
  };

  const hoverOutHandler = () => {
    setShowInfo(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div className={styles.top}>{value}</div>
        <div
          onMouseOver={hoverOnHandler}
          onMouseOut={hoverOutHandler}
          style={{ height: barFillHeight }}
          className={styles.inner}
        ></div>
      </div>
      {showInfo && (
        <div className={styles.infoContainer}>
          <div>{text}</div>
        </div>
      )}
    </div>
  );
};

export default Bar;
