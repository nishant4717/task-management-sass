import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import Navbar from "../components/Navbar";

function AddTask() {
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post("/tasks", task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Task Added Successfully");

      navigate("/");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to Add Task"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="row justify-content-center">

          <div className="col-md-7">

            <div className="card shadow p-4">

              <h2 className="text-center mb-4">
                Add New Task
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label className="form-label">
                    Title
                  </label>

                  <input
                    className="form-control"
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Description
                  </label>

                  <textarea
                    className="form-control"
                    rows="4"
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                  />

                </div>

                <div className="row">

                  <div className="col-md-4 mb-3">

                    <label className="form-label">
                      Priority
                    </label>

                    <select
                      className="form-select"
                      name="priority"
                      value={task.priority}
                      onChange={handleChange}
                    >
                      <option value="Low">
                        Low
                      </option>

                      <option value="Medium">
                        Medium
                      </option>

                      <option value="High">
                        High
                      </option>

                    </select>

                  </div>

                  <div className="col-md-4 mb-3">

                    <label className="form-label">
                      Status
                    </label>

                    <select
                      className="form-select"
                      name="status"
                      value={task.status}
                      onChange={handleChange}
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="In Progress">
                        In Progress
                      </option>

                      <option value="Completed">
                        Completed
                      </option>

                    </select>

                  </div>

                  <div className="col-md-4 mb-3">

                    <label className="form-label">
                      Due Date
                    </label>

                    <input
                      className="form-control"
                      type="date"
                      name="dueDate"
                      value={task.dueDate}
                      onChange={handleChange}
                    />

                  </div>

                </div>

                <button
                  className="btn btn-primary w-100"
                  type="submit"
                >
                  Add Task
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </>
  );
}

export default AddTask;