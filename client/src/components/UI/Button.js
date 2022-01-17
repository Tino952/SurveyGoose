import styles from "./Button.module.css";

const Button = (props) => {
  let color = `${styles.blue}`;
  if (props.color === "g") {
    color = `${styles.green}`;
  }
  let buttonSize = props.small ? `${styles.small}` : `${styles.large}`;

  return (
    <button
      onClick={props.onClick}
      className={`${styles.button} ${color} ${buttonSize} ${
        props.hide && styles.hide
      }`}
    >
      {props.children}
    </button>
  );
};

export default Button;
