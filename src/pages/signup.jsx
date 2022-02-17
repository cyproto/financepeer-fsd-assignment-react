import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { signupUser } from "../api/api.services";
import "./signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const nav = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    signupUser({ email, password })
      .then((res) => {
        if (res.status === 201) {
          setSuccessMessage("Signed up successfully");
          nav("/");
        } else {
          setMessage(res.error);
        }
      })
      .catch((error) => {
        console.error(error.response.data);
        if (error.response.data?.error?.email) {
          setMessage("Email is already taken");
        } else {
          setMessage("Failed to signup");
        }
      });
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="signup-wrapper">
        <h2>Signup</h2>
        <TextField
          type="email"
          name="email"
          placeholder="Enter email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          type="password"
          name="password"
          placeholder="Enter password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          type="password"
          name="password"
          placeholder="Confirm password"
          label="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {message && <span className="error-text">{message}</span>}
        {successMessage && (
          <span className="success-text">{successMessage}</span>
        )}
        <div>
          <Button type="submit" variant="outlined">
            Submit
          </Button>
          <a href="/" className="signup-text">
            Login
          </a>
        </div>
      </div>
    </form>
  );
};

export default Signup;
