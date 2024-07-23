import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { IoBookSharp } from "react-icons/io5";
import { FaUsersSlash } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

import AuthContext from "../../../../server/src/Authentication/Authentication";
import Dashboard from "../../components/Dashboard/Dashboard";
function Admin() {
  const { isLoggedIn } = useContext(AuthContext);
  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);

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

      setMembers(data);
    } catch (error) {
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:3000/api/books/admin/getbooks",
        {
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Fetched Books:", data);
      setBooks(data);
    } catch (error) {
      toast(error.message, { theme: "failure" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedUsers();
    fetchUsers();
    fetchBooks();
  }, []);

  return (
    <div>
      <div className="adminDash">
        <Dashboard />
        <div className="flexContainer">
          {isLoggedIn && (
            <div>
              <div className="welcome">
                <h3>welcome</h3>
                <div className="div">
                  <p> {localStorage.getItem("firstName")} </p>
                  <p> {localStorage.getItem("lastName")}</p>
                </div>
              </div>
              <div className="iconify">
                <div className="showUsers">
                  <FaUsersSlash />
                  <p>
                    {" "}
                    {users.length > 0
                      ? `${users.length} users`
                      : "no users yet"}
                  </p>
                </div>
                <div className="showUsers">
                  <FaUsers />
                  <p>
                    {" "}
                    {members.length > 0
                      ? `${members.length} members`
                      : "no members yet"}
                  </p>
                </div>

                <div className="showUsers">
                  <IoBookSharp />
                  <p>
                    {" "}
                    {books.length > 0
                      ? ` ${books.length} books`
                      : "no members yet"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
