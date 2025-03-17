import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ForgotPassword.css";  

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("A password reset link has been sent to " + email);
    navigate("/verifycode"); // Redirect to VerifyCode page after submitting
  };

  return (
    <div className="forgot-password-container">
      <form onSubmit={handleSubmit}>
        <h2 className="forgot-password-title">Recover Password</h2>
        <p className="forgot-password-text">
          Forgot your password? Don’t worry, enter your email to reset your current password.
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="forgot-password-input"
        />
        <button type="submit" className="forgot-password-button">Submit</button>
        <a
          href="/verifycode"
          className="forgot-password-back"
          onClick={() => navigate("/verifycode")} // Navigate to VerifyCode page
        >
          <div className="back-to-Registration-container">
            <a href="/registration" className="back-to-Registration-link">Go Back</a>
          </div>
        </a>
      </form>
    </div>
  );
};

export default ForgotPassword;
