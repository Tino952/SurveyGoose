import styles from "./BarChart.module.css";
import Bar from "./Bar";

const BarChart = ({ answers }) => {
  let answerCountArr = answers.map((element) => element.count);
  let max = Math.max(...answerCountArr);

  return (
    <ul className={styles.barContainer}>
      {answers.map((element) => (
        <li className={styles.bar} key={element.answerId}>
          <Bar value={element.count} max={max} text={element.answerText} />
        </li>
      ))}
    </ul>
  );
};

export default BarChart;
