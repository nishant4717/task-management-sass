import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

function TaskCard({ task, fetchTasks }) {

  const deleteTask = async () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem("token");

      await API.delete(`/tasks/${task._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Task Deleted Successfully");

      fetchTasks();

    } catch (error) {

      console.error(error);

      toast.error("Failed to Delete Task");

    }

  };

  const priorityColor = () => {
    switch (task.priority) {
      case "High":
        return "danger";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
      default:
        return "secondary";
    }
  };

  const statusColor = () => {
    switch (task.status) {
      case "Completed":
        return "success";
      case "Pending":
        return "warning";
      case "In Progress":
        return "primary";
      default:
        return "secondary";
    }
  };

  return (
    <div className="card shadow border-0 mb-4">

      <div className="card-body">

        <div className="d-flex justify-content-between">

          <h4 className="fw-bold">
            {task.title}
          </h4>

          <span className={`badge bg-${priorityColor()}`}>
            {task.priority}
          </span>

        </div>

        <hr />

        <p>
          {task.description}
        </p>

        <div className="mb-3">

          <span className={`badge bg-${statusColor()} me-2`}>
            {task.status}
          </span>

          <span className="badge bg-dark">
            Due:
            {" "}
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "Not Set"}
          </span>

        </div>

        <div className="d-flex gap-2">

          <Link
            to={`/edit-task/${task._id}`}
            className="btn btn-warning"
          >
            ✏ Edit
          </Link>

          <button
            className="btn btn-danger"
            onClick={deleteTask}
          >
            🗑 Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default TaskCard;