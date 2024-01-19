import React from "react";
import "./styles.css";
import HomePage from "./components/home/HomePage";
import LoginPage from "./components/login/LoginPage";
import Profile from "./components/profile/Profile";
// import { createBrowserRouter, RouterProvider, Router, Route } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} exact/>
          <Route path="/login" element={<LoginPage />} exact/>
          <Route path="/profile" element={<Profile />} exact/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

/**
 * const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/login",
      element: <LoginPage />
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  ); 
*/