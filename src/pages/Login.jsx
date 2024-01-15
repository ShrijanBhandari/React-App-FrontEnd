import React, { useContext, useState } from "react";
import "../styles/Login.css";
import axios from "axios";
import { server } from "../App";
import toast from "react-hot-toast";
import { AppContext } from "../main";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    isAuthenticated,
    setIsAuthenticated,
    setRefresh,
    loading,
    setLoading,
    timeout,
    visible,
    setVisible,
  } = useContext(AppContext);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    loginUser();
  };
  const loginUser = async () => {
    try {
      const { data } = await axios.post(
        `${server}/user/login`,
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsAuthenticated(true);
      setRefresh((prev) => !prev);
      toast.success(data.message);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      timeout();
      setIsAuthenticated(false);
    }
  };

  const visibilityToggle = (e) => {
    e.preventDefault();
    var input = document.querySelector(".passwordcontainer input");
    if (visible) {
      input.setAttribute("type", "text");
      e.target.innerHTML = "visibility";
    } else {
      input.setAttribute("type", "password");
      e.target.innerHTML = "visibility_off";
    }
    setVisible((prev) => !prev);
  };

  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <>
      <div className="container">
        <div className="form-section">
          <form onSubmit={submitHandler}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div className="passwordcontainer">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
              />
              <span
                className="material-symbols-outlined"
                onClick={visibilityToggle}
              >
                visibility_off
              </span>
            </div>
            <button type="submit" className="btn-submit" disabled={loading}>
              Log In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
