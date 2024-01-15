import React, { useContext, useEffect, useState } from "react";
import { server } from "../App";
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext } from "../main";
import { Navigate } from "react-router-dom";
import "../styles/Setting.css";

const Settings = () => {
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const [skipCount, setSkipCount] = useState(true);
  const {
    isAuthenticated,
    user,
    setRefresh,
    setLoading,
    loading,
    timeout,
    visible,
  } = useContext(AppContext);
  const [struct, setStruct] = useState({
    old: {
      show: visible,
    },
    new: {
      show: visible,
    },
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const changeHandler = async (e) => {
    const uploaded_image = e.target.files[0];
    const base64 = await convertToBase64(uploaded_image);
    setProfile(base64);
  };

  const changenameHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${server}/user/updateName`,
        { changename: name },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      timeout();
      setRefresh((prev) => !prev);
      toast.success(data.message);
    } catch (error) {
      timeout();
      toast.error(error.response.data.message);
    }
  };
  const changeprofileHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${server}/user/updateProfile`,
        { changeprofile: profile },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      timeout();
      setRefresh((prev) => !prev);
      toast.success(data.message);
    } catch (error) {
      timeout();
      toast.error(error.response.data.message);
    }
  };
  const changepasswordHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${server}/user/updatePassword`,
        { currentPassword, newPassword },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      timeout();
      setRefresh((prev) => !prev);
      toast.success(data.message);
    } catch (error) {
      timeout();
      toast.error(error.response.data.message);
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

  const visibilityToggle = (e, id) => {
    e.preventDefault();
    var input = document.querySelector("#" + id);
    if (!struct[id].show) {
      input.setAttribute("type", "text");
      e.target.innerHTML = "visibility";
    } else {
      input.setAttribute("type", "password");
      e.target.innerHTML = "visibility_off";
    }
    setStruct({
      ...struct,
      [id]: {
        show: !struct[id].show,
      },
    });
  };

  useEffect(() => {
    if (skipCount) setSkipCount(false);
    if (!skipCount) changeprofileHandler();
  }, [profile]);

  if (!isAuthenticated) return <Navigate to={"/login"} />;
  return (
    <>
      <div className="setting">
        <div className="user_profile">
          <h1>Name: {user.name}</h1>
          <h1>Email: {user.email}</h1>
        </div>
        <div className="setting-form">
          <form onSubmit={changeprofileHandler}>
            <label htmlFor="changeprofile" id="setting_label">
              <img src={profile || user.profile} alt="myprofile" />
            </label>
            <input type="file" id="changeprofile" onChange={changeHandler} />
          </form>
          <form onSubmit={changenameHandler}>
            <input
              type="text"
              required
              placeholder="Change Your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <button type="submit" className="setting-btn" disabled={loading}>
              Update Name
            </button>
          </form>
          <form onSubmit={changepasswordHandler}>
            <div className="setting-passwordcontainer">
              <input
                id="old"
                type="password"
                required
                placeholder="Enter Current Password"
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                }}
              />
              <span
                className="material-symbols-outlined"
                onClick={(e) => visibilityToggle(e, "old")}
              >
                visibility_off
              </span>
            </div>
            <div className="setting-passwordcontainer">
              <input
                id="new"
                type="password"
                required
                minLength={"8"}
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
              <span
                className="material-symbols-outlined"
                onClick={(e) => visibilityToggle(e, "new")}
              >
                visibility_off
              </span>
            </div>
            <button type="submit" className="setting-btn" disabled={loading}>
              Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Settings;
