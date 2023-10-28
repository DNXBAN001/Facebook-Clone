import React from "react";
import "./styles.css";
import HomePage from "./components/home/HomePage";
import LoginPage from "./components/login/LoginPage";
import { createBrowserRouter, RouterProvider, /*Route*/ } from "react-router-dom";

export default function App() {
  const [rememberLogin, setRememberLogin] = React.useState(false);

  const router = createBrowserRouter([
    {
      path: "/home",
      element: <HomePage />
    },
    {
      path: "/login",
      element: <LoginPage />
    }
  ])

  return (
    <div className="App">
      {/* {rememberLogin ? <HomePage />: <LoginPage />} */}
      <RouterProvider router={router} />
    </div>
  );
}

