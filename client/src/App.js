import { useRef } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import MainHeader from "./components/Layout/MainHeader";
import Footer from "./components/Layout/Footer";
import Homepage from "./pages/Homepage";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/LoginPage";
import NewSurvey from "./pages/NewSurveyPage";
import QuestionSelector from "./pages/QuestionSelectorPage";
import QuestionInput from "./pages/QuestionInputPage";
import SuccessHeader from "./components/Layout/SuccessHeader";
import SavedSurvey from "./components/NewSurvey/SavedSurvey";
import MySurveysPage from "./pages/MySurveysPage";
import FillSurveyPage from "./pages/FillSurveyPage";
import DashboardPage from "./pages/DashboardPage";
import altlogo from "./assets/logoalt.png";
import logo from "./assets/logo.png";

function App() {
  const questionSuccessHeaderState = useSelector(
    (state) => state.successHeader.questionState
  );
  const surveySuccessHeaderState = useSelector(
    (state) => state.successHeader.surveyState
  );
  const questions = useSelector((state) => state.survey.questions);
  const header = useRef();

  // experimenting with DOM manipulation using refs
  // purpose is to style two different headers
  // in reality I would do this through passing "alt" to header props to
  // enable alternative styling
  let onHoverEnter = (e) => {
    e.target.style = "color: #13c8cc";
  };
  let onHoverExit = (e) => {
    e.target.style = "color: #fff";
  };
  const changeHeaderColor = () => {
    if (header.current) {
      header.current.style.background = "#282828";
      header.current.style.color = "#fff";
      header.current.children[0].children[0].src = altlogo;
      for (let elem of header.current.children[1].children[0].children) {
        elem.children[0].style = "color: #fff";
        elem.children[0].addEventListener("mouseover", onHoverEnter);
        elem.children[0].addEventListener("mouseout", onHoverExit);
      }
    }
  };
  const revertHeaderColor = () => {
    if (header.current) {
      header.current.style = "";
      header.current.children[0].children[0].src = logo;
      for (let elem of header.current.children[1].children[0].children) {
        elem.children[0].style.color = "";
        elem.children[0].removeEventListener("mouseover", onHoverEnter);
        elem.children[0].removeEventListener("mouseout", onHoverExit);
      }
    }
  };
  return (
    <div>
      <MainHeader ref={header} />
      <CSSTransition
        in={questionSuccessHeaderState}
        classNames="fade"
        mountOnEnter
        unmountOnExit
        timeout={800}
      >
        <SuccessHeader text={"Question"} />
      </CSSTransition>
      <CSSTransition
        in={surveySuccessHeaderState}
        classNames="fade"
        mountOnEnter
        unmountOnExit
        timeout={800}
      >
        <SuccessHeader text={"Survey"} />
      </CSSTransition>
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Login />}></Route>
          <Route path="/mysurveys" element={<MySurveysPage />}></Route>
          <Route
            path={"/newsurvey="}
            element={
              <>
                <SavedSurvey />
                <NewSurvey />
              </>
            }
          />
          <Route
            path={"/newsurvey=:surveyid"}
            element={
              <>
                <SavedSurvey />
                <NewSurvey />
              </>
            }
          />
          <Route
            path={"/newsurvey=:surveyid/questiontype"}
            element={
              <>
                <SavedSurvey />
                <QuestionSelector />
              </>
            }
          />
          <Route
            path={"/newsurvey=:surveyid/:questiontype/addquestion"}
            element={
              <>
                <SavedSurvey />
                <QuestionInput />
              </>
            }
          />
          {questions.map((question) => (
            <Route
              key={question.id}
              path={
                "/newsurvey=:surveyid/:questiontype/addquestion=:questionid"
              }
              element={
                <>
                  <SavedSurvey />
                  <QuestionInput />
                </>
              }
            />
          ))}
          <Route
            path={"/fillsurvey=:surveykey"}
            element={
              <>
                <FillSurveyPage />
              </>
            }
          />
          <Route
            path={"/mydashboard"}
            element={
              <>
                <DashboardPage
                  changeHeaderColor={changeHeaderColor}
                  revertHeaderColor={revertHeaderColor}
                />
              </>
            }
          >
            <Route
              path={":id"}
              element={
                <>
                  <DashboardPage
                    changeHeaderColor={changeHeaderColor}
                    revertHeaderColor={revertHeaderColor}
                  />
                </>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/404" />} />
          <Route path="404" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
