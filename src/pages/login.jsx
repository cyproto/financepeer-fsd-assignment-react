import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../api/api.services";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const nav = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    loginUser({ email, password })
      .then((res) => {
        if (res.status === 200) {
          window.sessionStorage.setItem("auth_token", res.data.token);
          nav("/dashboard");
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage(err.response.data.error);
      });
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="login-wrapper">
        <h2>Login</h2>
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
        {message && <span className="error-text">{message}</span>}
        <div>
          <Button type="submit" variant="outlined">
            Submit
          </Button>
          <a href="/signup" className="signup-text">
            Signup
          </a>
        </div>
      </div>
    </form>
  );
};

export default Login;
