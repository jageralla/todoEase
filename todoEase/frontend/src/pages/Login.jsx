/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
//import { Link } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn();
  }, []);

  const isLoggedIn = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    const now = Date.now() / 1000;

    if (accessToken && refreshToken) {
      const decodedAccessToken = jwtDecode(accessToken); //decode the access token
      const decodedRefreshToken = jwtDecode(refreshToken); //decode the refresh token
      const accessTokenExpiration = decodedAccessToken.exp; // get access token expiration
      const refreshTokenExpiration = decodedRefreshToken.exp; // get refresh token expiration
      if (accessTokenExpiration > now && refreshTokenExpiration > now) {
        console.log("token available and not expired");
        navigate("/");
      }
    }
  };

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    const isValidPassword = password.length > 0;

    if (!isValidEmail) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (!isValidPassword) {
      alert("Please enter your password.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(true);
    if (!validateInputs()) return; // Validate inputs before submission
    setLoading(true);

    try {
      const response = await api.post("/api/token/", { email, password });
      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
      setLoading(false);
      navigate("/");
    } catch (error) {
      alert("Invalid email or password.")
      console.log(error);

    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="login-page">
    <div className="form">
    <h1 className="mb-5">Login</h1>
      <form className="login-form">
        <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        <button disabled={loading? true: false} onClick={handleSubmit}>{loading? <Spinner/> : "Login"}</button>
        <p className="message"><Link to="/password-reset-request">Forgot password? </Link> <Link to="/register">Create an account</Link></p>
      </form>
    </div>
  </div>
  );
};

export default Login;
