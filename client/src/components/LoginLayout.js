import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"
import sideImage from "../img.jpg"
var CryptoJS = require("crypto-js");

export default function LoginLayout() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const my_secret_key = process.env.REACT_APP_SECRET_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // var encryptedPassword = CryptoJS.AES.encrypt(
    //   JSON.stringify(password),
    //   my_secret_key
    //   ).toString();
    //   console.log(encryptedPassword);

    axios
      .post(`http://localhost:5000/api/v1/employee/auth/login`, {
        email,
          // password: encryptedPassword,
          password : password
      })
      .then((response) => {
        const { token, data } = response.data;
        const clientInfo = {
          auth: true,
        };

          
        console.log(response);

        sessionStorage.setItem("clientInfo", JSON.stringify(clientInfo));

        sessionStorage.setItem("accessToken", token);
        sessionStorage.setItem("userData", JSON.stringify(data.userId));


        navigate("/dashboard");
      })
      .catch((error) => {
        if (error) {
          console.error("Login failed:", error);
        }
      });
  };
  return (
    <>
      {/* <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div> */}
          <div className="login-container">
      <div className="login-image">
        {/* Add your image here */}
        <img src={sideImage} alt="Login" />
      </div>
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
    </>
  );
}
