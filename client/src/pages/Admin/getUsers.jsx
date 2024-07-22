import React, { useState, useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import dummy2 from "../../assets/book4.jpeg";
import happy from "../../assets/happy.jpeg";
import "./Admin.css";
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";
import "react-simple-toasts/dist/theme/failure.css";
import "react-simple-toasts/dist/theme/success.css";
import Dashboard from "../../components/Dashboard/Dashboard";

function GetUsers() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const approveUsers = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/users/approveUser/${id}`,
        {
          credentials: "include",
          method: "PATCH",
        },
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      toast(data.message, { theme: "success" });
      fetchUsers();
    } catch (error) {
      toast(error.message, { theme: "failure" });
    } finally {
      setLoading(false);
    }
  };

  const declineUsers = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/users/declineUser/${id}`,
        {
          credentials: "include",
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      toast(data.message, { theme: "success" });
      fetchUsers();
    } catch (error) {
      toast(error.message, { theme: "failure" });
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/users/getUser", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      toast(error.message, { theme: "failure" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="membersContainers">
        <Dashboard />
        <div className="flexContainer">
          <div className="title">
            <h2 className="title">
              {loading ? <p>Please wait...</p> : <p>See users here:</p>}
            </h2>
          </div>
          <div className="membersContainer">
            {users.length > 0 ? (
              users.map((currentUser, i) => (
                <div className="ActualMember" key={i}>
                  <div className="final">
                    <div className="profile">
                      <img src={dummy2} alt="profile" />
                    </div>
                    <div className="details">
                      <div className="membersName">
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
                      className="true"
                      onClick={() => approveUsers(currentUser.id)}
                    >
                      accept
                    </button>
                    <button
                      className="false"
                      onClick={() => declineUsers(currentUser.id)}
                    >
                      decline
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <p>No users available</p>
                <img src={happy} alt="image of a happy picture" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetUsers;
