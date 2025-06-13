import React, { useState } from "react";
import loginLogo from "../../imgs/login-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import "./Login.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();
  const logIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        if (user) {
          navigate("/");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        if (user) {
          navigate("/");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div className="login">
      <Link to="/">
        <img src={loginLogo} alt="login logo" />
      </Link>
      <div className="login-container">
        <h1>Sign in</h1>
        <form>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <button onClick={logIn}>Sign in</button>
          <p>
            By continuing, you agree to Amazon's Fake Clone Conditions of Use
            and Privacy Notice.
          </p>
          <input
            type="submit"
            value="Create Your Amazon Account"
            onClick={signUp}
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
