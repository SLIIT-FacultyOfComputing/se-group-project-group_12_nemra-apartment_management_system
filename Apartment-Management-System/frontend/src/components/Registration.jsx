import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Components from "./Components";
import "../styles/Registration.css";

const Registration = () => {
  const [signIn, setSignIn] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // Initialize navigate hook

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form>
          <Components.Title>Create an Account</Components.Title>
          <Components.Input type="text" placeholder="User Name" />
          <Components.Input type="text" placeholder="House No" />
          <Components.Input type="email" placeholder="Email" />
          <Components.Input type="password" placeholder="Password" />
          <Components.Button>Sign Up</Components.Button>

          <Components.Divider>OR</Components.Divider>

          <Components.GoogleButton>
            <img
              src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
              alt="Google Logo"
            />
            Sign In with Google
          </Components.GoogleButton>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        <Components.Form onSubmit={handleLoginSubmit}>
          <Components.Title>LOG IN</Components.Title>
          <Components.Input type="text" placeholder="User Name" />
          <Components.Input type="password" placeholder="Password" />

          <Components.RememberMeContainer>
            <Components.RememberMeInput
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label>Remember Me</label>
          </Components.RememberMeContainer>

          <Components.Anchor href="Forgotpassword">
            Forgot your username or password?
          </Components.Anchor>
          <Components.Button type="submit">LOGIN</Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => setSignIn(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start your journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => setSignIn(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
};

export default Registration;
