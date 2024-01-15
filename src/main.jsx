import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/phone.css";
import { createContext } from "react";
export const AppContext = createContext({ isAuthenticated: false });
const AppWrapper = () => {
  const [user, setUser] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [visible, setVisible] = useState(false);
  const [task, setTask] = useState([]);
  const timeout = () => {
    return setTimeout(() => {
      setLoading(false);
    }, 300);
  };
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        refresh,
        setRefresh,
        loading,
        setLoading,
        timeout,
        visible,
        setVisible,
        task,
        setTask,
      }}
    >
      <App />
    </AppContext.Provider>
  );
};
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
