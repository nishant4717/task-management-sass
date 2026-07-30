import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API from "../services/api";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import TaskChart from "../components/TaskChart";
import TaskCard from "../components/TaskCard";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Dashboard Statistics

  const total = tasks.length;

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const progress = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  // Search + Filter

  const filteredTasks = tasks.filter((task) => {
    const matchSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "All" ||
      task.status === statusFilter;

    const matchPriority =
      priorityFilter === "All" ||
      task.priority === priorityFilter;

    return (
      matchSearch &&
      matchStatus &&
      matchPriority
    );
  });

  // Sorting

  const sortedTasks = [...filteredTasks];

  if (sortBy === "Newest") {
    sortedTasks.sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    );
  }

  if (sortBy === "Oldest") {
    sortedTasks.sort(
      (a, b) =>
        new Date(a.createdAt) -
        new Date(b.createdAt)
    );
  }

  if (sortBy === "Priority") {
    const order = {
      High: 1,
      Medium: 2,
      Low: 3,
    };

    sortedTasks.sort(
      (a, b) =>
        order[a.priority] -
        order[b.priority]
    );
  }

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        {/* Header */}

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h2>Dashboard</h2>

          <Link
            to="/add-task"
            className="btn btn-primary"
          >
            + Add Task
          </Link>

        </div>

        {/* Statistics */}

        <div className="row">

          <StatsCard
            title="Total Tasks"
            count={total}
            color="#0d6efd"
          />

          <StatsCard
            title="Pending"
            count={pending}
            color="#ffc107"
          />

          <StatsCard
            title="In Progress"
            count={progress}
            color="#0dcaf0"
          />

          <StatsCard
            title="Completed"
            count={completed}
            color="#198754"
          />

        </div>

        {/* Chart */}

        <div className="row mb-4">

          <div className="col-lg-6 mx-auto">

            <TaskChart
              pending={pending}
              progress={progress}
              completed={completed}
            />

          </div>

        </div>

        {/* Search + Filters */}

        <div className="row mb-4">

          <div className="col-md-3 mb-2">

            <input
              type="text"
              className="form-control"
              placeholder="Search Task..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <div className="col-md-3 mb-2">

            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="All">
                All Status
              </option>

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

          <div className="col-md-3 mb-2">

            <select
              className="form-select"
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(e.target.value)
              }
            >
              <option value="All">
                All Priority
              </option>

              <option value="High">
                High
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="Low">
                Low
              </option>

            </select>

          </div>

          <div className="col-md-3 mb-2">

            <select
              className="form-select"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
            >
              <option value="Newest">
                Newest
              </option>

              <option value="Oldest">
                Oldest
              </option>

              <option value="Priority">
                Priority
              </option>

            </select>

          </div>

        </div>

        {/* Task List */}

        {sortedTasks.length === 0 ? (

          <div className="alert alert-info">
            No Tasks Found
          </div>

        ) : (

          sortedTasks.map((task) => (

            <TaskCard
              key={task._id}
              task={task}
              fetchTasks={fetchTasks}
            />

          ))

        )}

      </div>

    </>
  );
}

export default Dashboard;