import { useRef, useState } from "react";
import Button from "../UI/Button";
import FormAction from "../UI/FormAction";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [newUser, setNewUser] = useState(false);
  const emailInput = useRef();
  const passwordInput = useRef();
  const fnameInput = useRef();
  const lnameInput = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit");
    emailInput.current.value = "";
    passwordInput.current.value = "";
    if (newUser) {
      fnameInput.current.value = "";
      lnameInput.current.value = "";
    }
  };
  const clickHandler = (event) => {
    event.preventDefault();
    setNewUser((prevValue) => !prevValue);
  };
  return (
    <div
      className={
        newUser ? `${styles.modal}` : `${styles.modal} ${styles.login}`
      }
    >
      <form className={styles.form} onSubmit={submitHandler}>
        <h2 className={styles.h2}>{newUser ? "Sign Up" : "Login"}</h2>
        <FormAction
          id={"email"}
          type={"email"}
          placeholder={"john@wick.com"}
          ref={emailInput}
          required={true}
        />
        <FormAction
          id={"password"}
          type={"password"}
          placeholder={"******"}
          ref={passwordInput}
          minLength={"6"}
          required={true}
        />
        {newUser && (
          <>
            <FormAction
              id={"firstname"}
              type={"text"}
              placeholder={"John"}
              ref={fnameInput}
              required={true}
            />
            <FormAction
              id={"lastname"}
              type={"text"}
              placeholder={"Wick"}
              ref={lnameInput}
              required={true}
            />
          </>
        )}
        <div className={styles.buttonContainer}>
          <Button>{newUser ? "Sign Up" : "Login"}</Button>
        </div>
        <div className={styles.cta}>
          <p className={styles.small}>
            {newUser
              ? "Already have an account?"
              : "Don't have an account yet?"}
          </p>
          <p onClick={clickHandler} className={styles.bold}>
            {newUser ? "Log In" : "Sign Up"}
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
