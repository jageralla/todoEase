/* eslint-disable react-hooks/exhaustive-deps */
//import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN } from "../constants";
import Spinner from "../components/Spinner";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      navigate("/");
    }
  }, []);

  const validateInputs = () => {
    const nameRegex = /^[a-zA-Z0-9 ]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidname = nameRegex.test(name);
    const isValidPassword = password.length >= 6;
    const isValidEmail = emailRegex.test(email);

    if (!isValidname) {
      alert(
        "Name must be at least 3 characters long and contain only letters and numbers."
      );
      return false;
    }

    if (!isValidEmail) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (!isValidPassword) {
      alert("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return; // Validate inputs before submission
    setLoading(true);

    try {
      const response = await api.post("/api/user/register/", {
        name,
        password,
        email,
      });
      console.log(response.data);
      alert("Registered successfully. You will be redirected to Login page.");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      alert("Email already exists.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
    <div className="form">
    <h1 className="mb-5">Register</h1>
      <form className="login-form">
        <input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)}/>
        <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        <button disabled={loading? true: false} onClick={handleSubmit}>{loading? <Spinner/> : "Register"}</button>
        <p className="message">Already registered? <Link to="/login">Login</Link></p>
      </form>
    </div>
  </div>
  );
};

export default Register;
