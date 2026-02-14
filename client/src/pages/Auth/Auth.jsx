import React, { useState } from "react";
import styles from "./Auth.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../redux/slices/authSlice";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (isLogin) {
      localStorage.setItem("credentials", {
        email: formData.email,
        password: formData.password,
      });

      dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
        })
      );

      console.log("Login Data:", {
        email: formData.email,
        password: formData.password,
      });

      toast.success("Login successful 🎉");
      navigate("/shop");
    } else {
      dispatch(registerUser(formData));
      console.log("Signup Data:", formData);
      toast.success("Registration successful 🚀");
      navigate("/auth");
    }

    // alert(isLogin ? "Login Successful!" : "Signup Successful!");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          )}

          <button type="submit">{isLogin ? "Sign In" : "Sign Up"}</button>
        </form>

        <p className={styles.switchText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}

          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Sign Up" : " Sign In"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
