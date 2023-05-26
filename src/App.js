import React from "react";
import "./styles.css";
import HomePage from "./components/home/HomePage";
import LoginPage from "./components/login/LoginPage";

export default function App() {
  const [rememberLogin, setRememberLogin] = React.useState(true);

  return (
    <div className="App">
      {rememberLogin ? <HomePage />: <LoginPage />}
    </div>
  );
}

