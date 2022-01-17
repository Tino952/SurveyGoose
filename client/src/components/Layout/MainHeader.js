import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./MainHeader.module.css";
import "../../index.css";
import logo from "../../assets/logo.png";

const MainHeader = React.forwardRef((props, header) => {
  const navigate = useNavigate();
  // const header = useRef();
  const [isVisible, setIsVisible] = useState(true);
  let headerClass = `${styles.header}`;
  headerClass = isVisible ? headerClass : headerClass + ` ${styles.sticky}`;

  const scrollHandler = () => {
    if (header.current) {
      const myHeader = header.current;
      const windowHeight = window.pageYOffset;
      const headerBottom = myHeader.clientHeight * 1.2;
      if (windowHeight > headerBottom) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    }
  };

  window.addEventListener("scroll", scrollHandler);

  const clickHandler = () => {
    navigate("/");
  };

  return (
    <header className={headerClass} ref={header}>
      <div className={styles.logo} onClick={clickHandler}>
        <img src={logo} alt="survey goose logo" />
        <span>Survey Goose</span>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/mysurveys">My Surveys</NavLink>
          </li>
          <li>
            <NavLink to="/login">Log in</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
});

export default MainHeader;
