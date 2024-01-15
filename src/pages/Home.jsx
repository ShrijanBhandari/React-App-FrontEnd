import "../styles/Home.css";
import React, { useContext, useState } from "react";
import { AppContext } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { server } from "../App";
import toast from "react-hot-toast";
import TaskList from "../components/TaskList";
const Home = () => {
  const { isAuthenticated } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { setRefresh, setLoading, timeout, task, loading } =
    useContext(AppContext);
  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/task/addtask`,
        { title, description },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setRefresh((prev) => !prev);
      timeout();
      toast.success(data.message);
    } catch (error) {
      timeout();
      setRefresh((prev) => !prev);
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) return <Navigate to={"/login"} />;
  return (
    <>
      <div className="home ">
        <div className="task-form">
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Add a task"
              value={title}
              required
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Add a description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              required
            />
            <button type="submit" className="btn-submit" disabled={loading}>
              Add task
            </button>
          </form>
        </div>

        {task.map((i) => (
          <div className="tasklist" key={i._id}>
            <TaskList
              title={i.title}
              description={i.description}
              id={i._id}
              isCompleted={i.isCompleted}
              key={i._id}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
