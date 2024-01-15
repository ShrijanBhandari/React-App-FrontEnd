import Header from "../components/Header.jsx";
import { Outlet } from "react-router-dom";
export const HomeLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
