import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Settings from "./pages/Settings.jsx";
import Profile from "./pages/Profile.jsx";
import { HomeLayout } from "./Layout/HomeLayout.jsx";
import { AuthLayout } from "./Layout/AuthLayout.jsx";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { AppContext } from "./main.jsx";
export const server = "https://backend-todo-10cm.onrender.com/api/v1";
import "./styles/App.css";
function App() {
  const { setUser, setIsAuthenticated, refresh, setTask } =
    useContext(AppContext);
  const [skip, setSkip] = useState(true);
  useEffect(() => {
    if (skip) return setSkip(false);
    axios
      .get(`${server}/user/mydata`, { withCredentials: true })
      .then((res) => {
        setIsAuthenticated(true);
        setUser(res.data.user_data);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setUser({});
      });
    axios
      .get(`${server}/task/mytask`, { withCredentials: true })
      .then((res) => {
        setTask(res.data.tasks);
      });
  }, [refresh]);
  return (
    <Router>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
