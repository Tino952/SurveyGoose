import { useEffect } from "react";
import LoginForm from "../../components/Login/LoginForm";

const LoginPage = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  return <LoginForm />;
};

export default LoginPage;
