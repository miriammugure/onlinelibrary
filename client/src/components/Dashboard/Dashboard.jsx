import React from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
function Dashboard() {
  return (
    <div>
      <div className="dashboard">
        <h2>dashboard</h2>
        <div className="dashLinks">
          <div>
            {" "}
            <Link to={"/GetUsers"}>
              <button> see users </button>
            </Link>
          </div>
          <div>
            <Link to={"/Approved"}>
              <button> see members </button>
            </Link>
          </div>
          <div>
            <Link to={"/Library"}>
              <button> see books </button>
            </Link>
          </div>
          <div>
            <Link to={"/Book"}>
              <button>add books </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
