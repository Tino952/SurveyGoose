import react, { useRef } from "react";
import styles from "./FormAction.module.css";

const FormAction = react.forwardRef((props, ref) => {
  let alt = props.alternate;
  let type = props.type;
  let id = props.id;
  let title = props.title;
  let placeholder = props.placeholder;
  let minLength = props.minLength;
  let required = props.required;
  let deleteInput = props.deleteQuestion;
  let onKeyUp = props.onKeyUp;
  let content = props.content;

  let myRef = useRef();

  if (!alt) {
    myRef = ref;
  }

  if (content && myRef.current) {
    myRef.current.value = content;
  }

  const deleteHandler = () => {
    deleteInput(id);
  };

  const saveHandler = () => {
    props.save(id, myRef.current.value);
  };

  return (
    <div className={alt ? styles.altActions : styles.actions}>
      <label htmlFor={type}>{title}</label>
      <input
        required={required}
        type={type}
        id={id}
        ref={myRef}
        placeholder={placeholder}
        minLength={minLength}
        onKeyUp={alt ? saveHandler : onKeyUp}
      />
      {alt && <div className={styles.delete} onClick={deleteHandler}></div>}
    </div>
  );
});

export default FormAction;
