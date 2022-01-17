import { useEffect } from "react";
import styles from "./index.module.css";
import SideBar from "../../components/Dashboard/SideBar";
import Results from "../../components/Dashboard/Results";

const DashboardPage = (props) => {
  let changeHeaderColor = props.changeHeaderColor;
  let revertHeaderColor = props.revertHeaderColor;
  useEffect(() => {
    changeHeaderColor();
    return () => {
      revertHeaderColor();
    };
  }, [changeHeaderColor, revertHeaderColor]);

  return (
    <div className={styles.container}>
      <SideBar />
      <Results />
    </div>
  );
};

export default DashboardPage;
