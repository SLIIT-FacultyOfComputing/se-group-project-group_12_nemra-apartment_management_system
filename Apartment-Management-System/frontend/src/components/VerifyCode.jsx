import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/VerifyCode.css";  

const VerifyCode = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
 
    alert("Verification code entered: " + verificationCode);
    navigate("/Resetpassword"); // Redirect to the reset password page after verification
  };

  return (
    <div className="verify-code-container">
      <form onSubmit={handleSubmit} className="verify-code-form">
        <h2 className="verify-code-title">Verify Your Email</h2>

        <p className="verify-code-text">
          We have sent a verification code to your email. Please enter the code below.
        </p>

        <div className="input-container">
          <label htmlFor="email" className="input-label">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="verify-code-input"
          />
        </div>

        <div className="input-container">
          <label htmlFor="verification-code" className="input-label">Verification Code</label>
          <input
            type="text"
            id="verification-code"
            placeholder="Enter the verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
            className="verify-code-input"
          />
        </div>

        <button type="submit" className="verify-code-button">Verify</button>

         
      </form>
    </div>
  );
};

export default VerifyCode;
