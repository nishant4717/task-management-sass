import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function TaskChart({ pending, progress, completed }) {
  const data = {
    labels: [
      "Pending",
      "In Progress",
      "Completed",
    ],
    datasets: [
      {
        label: "Tasks",
        data: [
          pending,
          progress,
          completed,
        ],
        backgroundColor: [
          "#ffc107",
          "#0dcaf0",
          "#198754",
        ],
        borderColor: [
          "#ffffff",
          "#ffffff",
          "#ffffff",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="card shadow border-0 mb-4">
      <div className="card-body">
        <h4 className="text-center mb-4">
          Task Analytics
        </h4>

        <div
          style={{
            height: "300px",
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </div>
      </div>
    </div>
  );
}

export default TaskChart;