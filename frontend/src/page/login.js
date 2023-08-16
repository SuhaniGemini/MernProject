import React, { useEffect, useState } from "react";
import Picture from "../assest/Profile.png";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";
import "./login.css";
// import { IoIosLogIn } from "react-icons/io";

import axios from "axios";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const userData = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    // Check for token in cookie on page load
    const checkUserLoginStatus = async () => {
      try {
        const response = await axios.get(
          "/checkLoginStatus"
        );
        if (response.data) {
          dispatch(loginRedux(response.data));
        }
      } catch (err) {
        console.log(err);
      }
    };
    checkUserLoginStatus();
  }, []);
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userInfo = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });
      toast("Login Successful");
      setData({
        email: email,
        password: password,
      });
      dispatch(loginRedux(userInfo));
      navigate("/");
    } catch (err) {
      toast("Invalid login credentials");
    }
  };

  return (
    
    
    <div className="custom-container">
    <div className="custom-card">
      <h1 className="custom-title">Login</h1>

      <div className="custom-image-container">
        <img src={Picture} alt="Profile" className="custom-image" />
      </div>

      <form className="custom-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="custom-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <div className="custom-password-input">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            className="custom-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="custom-password-toggle" onClick={handleShowPassword}>
            {showPassword ? <BiShow /> : <BiHide />}
          </span>
        </div>

        <button className="custom-button">Login</button>
      </form>
      <p className="custom-signup-text">
        Don't have an account? <a href="/signup" className="custom-signup-link">Sign Up</a>
      </p>
    </div>
  </div>
);
};

export default Login;
