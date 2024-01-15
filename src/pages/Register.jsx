import React, { useContext, useState } from "react";
import "../styles/Login.css";
import axios from "axios";
import { server } from "../App";
import toast from "react-hot-toast";
import { AppContext } from "../main";
import { Navigate } from "react-router-dom";
import avatar from "../images/avatar.jpg";

const Register = () => {
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    isAuthenticated,
    setIsAuthenticated,
    setRefresh,
    loading,
    timeout,
    setLoading,
    visible,
    setVisible,
  } = useContext(AppContext);

  const changeHandler = async (e) => {
    e.preventDefault();
    const uploaded_image = e.target.files[0];
    const base64 = await convertToBase64(uploaded_image);
    setProfile(base64);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    registerUser();
  };

  const registerUser = async () => {
    try {
      const { data } = await axios.post(
        `${server}/user/register`,
        { name, email, password, profile },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsAuthenticated(true);
      toast.success(data.message);
      timeout();
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      timeout();
      setIsAuthenticated(false);
    }
  };

  const convertToBase64 = (uploaded_image) => {
    return new Promise((resolve, reject) => {
      const filereader = new FileReader();
      filereader.readAsDataURL(uploaded_image);
      filereader.onload = (e) => {
        resolve(e.target.result);
      };
      filereader.onerror = (e) => {
        reject(e);
        console.log("Error occured while converting image file");
      };
    });
  };

  const visibilityToggle = (e) => {
    e.preventDefault();
    var input = document.querySelector(".passwordcontainer input");
    if (!visible) {
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
            <label htmlFor="fileupload" id="register_label">
              <img src={profile || avatar} alt="Select Profile Picture" />
              Select Profile Picture
            </label>
            <input type="file" id="fileupload" onChange={changeHandler} />
            <input
              type="text"
              required
              placeholder="Username"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div className="passwordcontainer">
              <input
                type="password"
                required
                minLength={"8"}
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
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Register;
