/* eslint-disable no-unused-vars */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
//import "./App.css";
import Header from "./components/Header";
import PasswordResetRequestPage from "./pages/PasswordResetRequestPage";
import PasswordResetConfirmPage from "./pages/PasswordResetConfirmPage";
import Home from "./pages/Home";
import Spinner from "./components/Spinner";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function App() {
  const [token, setToken] = useState("");
  const [serverActive, setServerActive] = useState("false");
  const [checkingServer, setCheckingServer] = useState(true);

  useEffect(() => {
    checkServerStatus(); // check if backend server is online
    const path = window.location.pathname;
    const segments = path.split("/"); // Split the path into segments
    const tokenFromUrl = segments[segments.length - 2]; // Assuming the token is the last segment
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, []);

  const checkServerStatus = async () => {
    try {
      const response = await axios.get(baseUrl + "/api/server-status/");
      if (response.status === 200) {
        setServerActive(true);
      }
    } catch (error) {
      setServerActive(false);
    }
    setCheckingServer(false);
  };

  return (
    <>
      <BrowserRouter>
        <Header />
        {checkingServer ? (
          <div className="spinner-container">
            <Spinner />
          </div>
        ) : !serverActive ? (
          <p className="text-center">500 INTERNAL SERVER ERROR</p>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="/password-reset-request"
              element={<PasswordResetRequestPage />}
            />
            <Route
              path="/password-reset-confirm/:token"
              element={<PasswordResetConfirmPage token={token} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
