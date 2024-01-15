import React from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

const LoginHeader = () => {
  return (
    <>
      <div className="navbar">
        <nav>
          <Link to={"/login"} className="linknav">
            Login
          </Link>
          <Link to={"/register"} className="linknav">
            Register
          </Link>
        </nav>
      </div>
    </>
  );
};
export default LoginHeader;
