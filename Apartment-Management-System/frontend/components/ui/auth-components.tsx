"use client"

import styled from "styled-components"
import type { ReactNode } from "react"

// Define interface for components that use signinIn prop
interface SignInProps {
  signinIn?: boolean
  children?: ReactNode
}

// Container for the entire registration form
export const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 800px; 
  max-width: 100%;
  min-height: 500px;
  margin: 2rem;
`

// SignUpContainer for the sign-up form
export const SignUpContainer = styled.div<SignInProps>`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${(props) =>
    props.signinIn !== true
      ? ` 
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  `
      : null}
`

// SignInContainer for the sign-in form
export const SignInContainer = styled.div<SignInProps>`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${(props) => (props.signinIn !== true ? `transform: translateX(100%);` : null)}
`

// Remember Me Container (aligned to the left)
export const RememberMeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;  /* Aligns to the left */
  width: 100%;
  margin: 10px 0;

  label {
    margin-left: 8px;
    font-size: 14px;
    color: #333;
  }
`

// Checkbox Input
export const RememberMeInput = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`

// Form styling for the input fields and buttons
export const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`

// Title styling
export const Title = styled.h1`
  font-weight: bold;
  margin: 0;
`

// Input field styling
export const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`

// Button styling
export const Button = styled.button`
  border-radius: 20px;
  border: 1px solid rgb(255, 255, 255);
  background-color: rgb(121, 26, 121);
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  margin-top: 10px; /* Added spacing */
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`

// Ghost button with transparent background
export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: rgb(255, 255, 255);
`

// Anchor link styling (for the "Forgot your password" link)
export const Anchor = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`

// Overlay container for the transition between the sign-in and sign-up panels
export const OverlayContainer = styled.div<SignInProps>`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${(props) => (props.signinIn !== true ? `transform: translateX(-100%);` : null)}
`

// Overlay transition styling (for background effect)
export const Overlay = styled.div<SignInProps>`
  background: linear-gradient(to right, rgb(121, 26, 121), rgb(90, 50, 90));
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${(props) => (props.signinIn !== true ? `transform: translateX(50%);` : null)}
`

// Overlay panel (left and right)
export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`

// Google Sign-In Button
export const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #f8f9fa;
  color: #3c4043;
  font-size: 14px;
  padding: 12px;
  border: 1px solid #dadce0;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-top: 15px;

  &:hover {
    background-color: #e8eaf0;
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`

// Divider with "OR" text
export const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 15px 0;
  width: 100%;
  color: #3c4043;
  font-size: 14px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #dadce0;
    margin: 0 10px;
  }
`

export const LeftOverlayPanel = styled(OverlayPanel)<SignInProps>`
  transform: translateX(-20%);
  ${(props) => (props.signinIn !== true ? `transform: translateX(0);` : null)}
`

export const RightOverlayPanel = styled(OverlayPanel)<SignInProps>`
  right: 0;
  transform: translateX(0);
  ${(props) => (props.signinIn !== true ? `transform: translateX(20%);` : null)}
`

// Paragraph text styling
export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`

