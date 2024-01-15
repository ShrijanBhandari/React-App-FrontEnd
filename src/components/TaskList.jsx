import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { server } from "../App";
import toast from "react-hot-toast";
import { AppContext } from "../main";
import "../styles/Home.css";

const TaskList = ({ title, description, id, isCompleted }) => {
  const { setRefresh, timeout, setLoading, loading, visible } =
    useContext(AppContext);
  const [changeTitle, setChangeTitle] = useState("");
  const [changeDescription, setChangeDescription] = useState("");
  const [struct, setStruct] = useState({
    [id]: {
      show: visible,
    },
  });
  const changeHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${server}/task/check/${id}`,
        {},
        {
          withCredentials: true,
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

  const deleteHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });
      timeout();
      setRefresh((prev) => !prev);
      toast.success(data.message);
    } catch (error) {
      timeout();
      toast.error(error.response.data.message);
    }
  };

  const editHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    var edit = document.getElementById(id);
    if (!struct[id].show) {
      edit.classList.add("showedit");
    } else {
      edit.classList.remove("showedit");
    }
    setStruct({
      [id]: {
        show: !struct[id].show,
      },
    });
    timeout();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${server}/task/editTask`,
        {
          changeTitle,
          changeDescription,
          id,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
      timeout();
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log("error");
      timeout();
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="task_profile">
        <div className="tasks">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <input
          type="checkbox"
          className="check"
          checked={isCompleted}
          onChange={changeHandler}
        />
        <button
          type="submit"
          className="btn-submit"
          onClick={editHandler}
          disabled={loading}
        >
          Edit
        </button>
        <button
          type="submit"
          className="btn-submit"
          onClick={deleteHandler}
          disabled={loading}
        >
          Delete
        </button>
      </div>
      <div className="hide" id={id}>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Edit Title"
            value={changeTitle}
            required
            onChange={(e) => {
              setChangeTitle(e.target.value);
            }}
          />
          <input
            type="text"
            required
            placeholder="Edit Description"
            value={changeDescription}
            onChange={(e) => {
              setChangeDescription(e.target.value);
            }}
          />
          <button type="submit" className="edit-btn" disabled={loading}>
            Update Task
          </button>
        </form>
      </div>
    </>
  );
};

export default TaskList;
