import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ResetPassword.css"; 

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
    } else {
      alert("Password has been successfully reset!");
      navigate("/Registration"); // Redirect to login page after resetting password
    }
  };

  return (
    <div className="reset-password-container">
      <form onSubmit={handleSubmit} className="reset-password-form">
        <h2 className="reset-password-title">Reset Password</h2>

        <p className="reset-password-text">
          Create a password that you haven’t used before.
        </p>

        <div className="input-container">
          <label htmlFor="password" className="input-label">Create Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="reset-password-input"
          />
        </div>

        <div className="input-container">
          <label htmlFor="confirm-password" className="input-label">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="reset-password-input"
          />
        </div>

        <p className="password-strength-text">Make sure password is strong</p>

        <button type="submit" className="reset-password-button">Verify</button>
      </form>
    </div>
  );
};

export default ResetPassword;
