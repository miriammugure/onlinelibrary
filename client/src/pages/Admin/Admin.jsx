import React from "react";
import { Link } from "react-router-dom";
import Dashboard from "../../components/Dashboard/Dashboard";
function Admin() {
  return (
    <div>
      <div className="adminDash">
        <Dashboard />
        {/* <div className="flexContainer">
          <div>
            {" "}
            <Link to={"/GetUsers"}>
              <button> see users </button>
            </Link>
          </div>
          <div>
            {" "}
            <Link to={"/Approved"}>
              <button> see members </button>
            </Link>
          </div>
          <div>
            {" "}
            <Link to={"/Book"}>
              <button> add books </button>
            </Link>
          </div>
          <div>
            {" "}
            <Link to={"/library"}>
              <button> see books </button>
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Admin;
