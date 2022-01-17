import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    {/* <HashRouter basename="https://tino952.github.io/SurveyGoose/"> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </HashRouter> */}
  </Provider>,
  document.getElementById("root")
);
