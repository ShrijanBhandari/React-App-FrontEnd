import { Outlet } from "react-router-dom";
import LoginHeader from "../components/LoginHeader.jsx";
export const AuthLayout = () => {
  return (
    <>
      <LoginHeader />
      <Outlet />
    </>
  );
};
