import React from "react";
import { IoPersonCircle } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import dummy2 from "../../assets/book4.jpeg";
import "./Admin.css";
import toast from "react-simple-toasts";
import { useState, useEffect } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";

function Approved() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [id, setId] = useState(null);

  const declineusers = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/users/declineUser/${id}`,
        {
          credentials: "include",
          method: "DELETE",
        },
      );
      const data = await response.json();
      toast(data.message, { theme: "success" });
      fetchApprovedUsers();
    } catch (error) {
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchApprovedUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:3000/api/users/getApprovedUser",
        {
          credentials: "include",
        },
      );

      const data = await response.json();
      console.log(data);

      setUsers(data);
    } catch (error) {
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedUsers();
  }, []);

  return (
    <div>
      <div className="membersContainers">
        <Dashboard />
        <div className="flexContainer">
          <div className="title">
            {" "}
            <h3 className="title">
              {loading ? <p>Please wait...</p> : <p>See members here:</p>}
            </h3>
          </div>
          <div className="membersContainer">
            {users.length > 0 ? (
              users.map((currentUser, i) => (
                <div className="ActualMember" key={i}>
                  <div className="final">
                    <div className="profile">
                      <img src={dummy2} alt="profile image" />
                    </div>
                    <div className="details">
                      <div className="membersName">
                        <IoPersonCircle />
                        {currentUser.firstName} {currentUser.lastName}
                      </div>
                      <div className="membersemail">
                        <MdEmail />
                        {currentUser.emailAddress}
                      </div>
                      <div className="membersName">
                        <FaPhoneAlt />
                        {currentUser.phoneNumber}
                      </div>
                    </div>
                  </div>
                  <div className="button1">
                    <button
                      className="false"
                      onClick={() => declineusers(currentUser.id)}
                    >
                      delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No users available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Approved;
