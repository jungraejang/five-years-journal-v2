import React, { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import "./App.css";
import LoginPage from "./components/LoginPage/LoginPage";
import MainPage from "./components/MainPage/MainPage";
import { Route, Routes } from "react-router-dom";
import Protected from "./wrappers/Protected.jsx";
import { selectIsLoggedIn } from "./slices/authSlice";
import { useNavigate } from "react-router-dom";

function App() {
  let isLoggedIn = useSelector(selectIsLoggedIn);
  let navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) return;
    navigate("/main");
  }, [isLoggedIn]);

  return (
    <Routes>
      <Route
        path="/main"
        element={
          <Protected>
            <MainPage />
          </Protected>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
