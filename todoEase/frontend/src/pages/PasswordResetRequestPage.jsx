// PasswordResetRequestForm.js
import { useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
const baseUrl = import.meta.env.VITE_API_URL

const PasswordResetRequestPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to validate email using regular expression
  const isEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!isEmailValid(email)) {
      setMessage("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      await axios.post(baseUrl + "/api/password-reset/", { email });
      setMessage("Password reset link has been sent to your email. Please check your inbox and spam folder.");
    } catch (error) {
      setMessage("The email you entered is not associated with any account.");
    }

    setLoading(false);
  };

  return (
    <div className="password-reset-container">
      <h2 className="mt-5">Password Reset Request</h2>
      <div className="task-field">
        <input
          className="input-field"
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          className="task-entry-action"
          style={{backgroundColor: "#aa64e8"}}
          disabled={email === "" ? true : false}
          onClick={handleSubmit}
        >
          {loading? <Spinner/> : "Reset"}
        </button>
      </div>
      <p className="mt-3 text-danger">{message}</p>
    </div>
  );
};

export default PasswordResetRequestPage;
