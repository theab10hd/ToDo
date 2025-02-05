import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../api/baseUrl";

function Todos() {
  const [serverTasks, setServerTasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const userid = sessionStorage.getItem("userid");

  const getUserTasks = async () => {
    try {
      const response = await axios.get(`${url}/todo/all/${userid}`);
      setServerTasks(response.data.tasks || []);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const storedTasks = sessionStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
    getUserTasks();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      sessionStorage.setItem("tasks", JSON.stringify(tasks));
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleAddTask = async () => {
    if (task.trim() === "") return;

    if (userid) {
      const serverTask = {
        task,
        userid,
      };

      try {
        const response = await axios.post(`${url}/todo/add`, serverTask);
        console.log("Task added successfully:", response.data);
        getUserTasks();
      } catch (e) {
        console.error("Error adding task:", e);
      }
    } else {
      const updatedTasks = [...tasks, task];
      setTasks(updatedTasks);
    }

    setTask("");
  };

  const handleLocalDelete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);

    setTasks(updatedTasks);

    sessionStorage.setItem("tasks", JSON.stringify(updatedTasks));
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleServerDelete = async (taskId) => {
    try {
      await axios.delete(`${url}/todo/delete/${taskId}`);

      setServerTasks(serverTasks.filter((task) => task._id !== taskId));

      console.log("Task deleted from server:", taskId);
    } catch (e) {
      console.error("Error deleting task:", e);
    }
  };

  return (
    <div className="container bg-body-secondary rounded-3 shadow-sm">
      <div className="d-flex flex-wrap">
        <div className="p-3 w-100">
          <div className="col-12 mt-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Add a new task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <button className="btn btn-primary " onClick={handleAddTask}>
                Add Task
              </button>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="row p-0">
              {serverTasks.length === 0 && tasks.length === 0 ? (
                <p className="text-center mt-3">No Task Found!</p>
              ) : (
                <>
                  {serverTasks.length === 0 ? null : (
                    <p className="text-center mt-3">User Tasks</p>
                  )}
                  {[...serverTasks].map((taskItem, index) => (
                    <div key={`server-task-${index}`}>
                      <div className="col-12 d-flex align-items-center mb-1 bg-body-tertiary rounded-3 task-box">
                        <div className="col d-flex align-items-center justify-content-center">
                          <i
                            className="fa-solid fa-check  fs-4"
                            onClick={() => handleServerDelete(taskItem._id)}
                          ></i>
                        </div>
                        <div className="col-11 p-3">
                          {typeof taskItem === "string"
                            ? taskItem
                            : taskItem.task}
                        </div>
                      </div>
                    </div>
                  ))}
                  {tasks.length === 0 ? null : (
                    <p className="text-center mt-2">Local Tasks</p>
                  )}
                  {[...tasks].map((taskItem, index) => (
                    <div key={`local-task-${index}`}>
                      <div className="col-12 d-flex align-items-center mb-1 bg-body-tertiary rounded-3 task-box">
                        <div className="col d-flex align-items-center justify-content-center">
                          <i
                            className="fa-solid fa-check fs-4"
                            onClick={() => handleLocalDelete(index)}
                          ></i>
                        </div>
                        <div className="col-11 p-3">
                          {typeof taskItem === "string"
                            ? taskItem
                            : taskItem.task}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todos;
