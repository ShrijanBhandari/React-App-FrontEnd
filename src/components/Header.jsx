import React, { useContext } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { AppContext } from "../main";
import axios from "axios";
import { server } from "../App";
import toast from "react-hot-toast";

const Header = () => {
  const { setIsAuthenticated } = useContext(AppContext);
  const logoutHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(`${server}/user/logout`, {
      withCredentials: true,
    });
    setIsAuthenticated(false);
    toast.success(data.message);
  };

  return (
    <>
      <div className="navigation">
        <nav className="navbar">
          <Link to={"/"} className="linknav">
            Home
          </Link>
          <Link to={"/profile"} className="linknav">
            Profile
          </Link>
          <Link to={"/settings"} className="linknav">
            Settings
          </Link>
          <button onClick={logoutHandler} className="btn">
            Logout
          </button>
        </nav>
      </div>
    </>
  );
};

export default Header;
