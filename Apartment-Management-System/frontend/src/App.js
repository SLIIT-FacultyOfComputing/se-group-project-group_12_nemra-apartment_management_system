import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./components/Registration";
import ForgotPassword from "./components/ForgotPassword";
import VerifyCode from "./components/VerifyCode";
import Resetpassword from "./components/ResetPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/verifyCode" element={<VerifyCode />} />
        <Route path="/resetpassword" element={<Resetpassword />} />
       
      </Routes>
    </Router>
  );
}

export default App;
