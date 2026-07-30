import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../services/api";
import Navbar from "../components/Navbar";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
  });

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTask({
        ...res.data,
        dueDate: res.data.dueDate
          ? res.data.dueDate.substring(0, 10)
          : "",
      });

    } catch (error) {
      console.error(error);
      toast.error("Failed to Load Task");
    }
  };

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

      await API.put(`/tasks/${id}`, task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Task Updated Successfully");

      navigate("/");

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to Update Task"
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
                Edit Task
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label className="form-label">
                    Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    className="form-control"
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
                    name="description"
                    className="form-control"
                    rows="4"
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
                      name="priority"
                      className="form-select"
                      value={task.priority}
                      onChange={handleChange}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>

                  </div>

                  <div className="col-md-4 mb-3">

                    <label className="form-label">
                      Status
                    </label>

                    <select
                      name="status"
                      className="form-select"
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
                      type="date"
                      name="dueDate"
                      className="form-control"
                      value={task.dueDate}
                      onChange={handleChange}
                    />

                  </div>

                </div>

                <button
                  className="btn btn-success w-100"
                  type="submit"
                >
                  Update Task
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </>
  );
}

export default EditTask;