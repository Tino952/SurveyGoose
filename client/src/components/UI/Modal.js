import styles from "./Modal.module.css";
import Button from "./Button";

const Modal = ({ closeModal, navigate }) => {
  return (
    <div className={styles.backdrop} onClick={closeModal}>
      <div className={styles.container}>
        <h3>
          Editing a deployed survey can cause discrepancies between your saved
          surveys and deployed surveys
        </h3>
        <div className={styles.buttonContainer}>
          <Button onClick={navigate}>Edit Anyways</Button>
          <Button color={"g"} onClick={closeModal}>
            Undeploy First
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
