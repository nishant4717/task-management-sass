import React from "react";

function StatsCard({ title, count, color }) {
  return (
    <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
      <div
        className="card text-white shadow-lg border-0"
        style={{
          backgroundColor: color,
          borderRadius: "15px",
        }}
      >
        <div className="card-body text-center">

          <h6
            className="text-uppercase"
            style={{
              letterSpacing: "1px",
            }}
          >
            {title}
          </h6>

          <h1
            className="display-5 fw-bold mt-3"
          >
            {count}
          </h1>

        </div>
      </div>
    </div>
  );
}

export default StatsCard;