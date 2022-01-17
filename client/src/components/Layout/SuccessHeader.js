import styles from "./SuccessHeader.module.css";

const SuccessHeader = ({ text, alert }) => {
  return (
    <header
      className={`${styles.header} ${alert ? styles.alert : styles.success}`}
    >
      <p>
        {text}
        {!alert && " saved succesfully"}
      </p>
    </header>
  );
};

export default SuccessHeader;
