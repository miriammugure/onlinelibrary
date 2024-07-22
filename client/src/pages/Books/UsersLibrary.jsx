import React, { useState, useEffect } from "react";
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";
import "react-simple-toasts/dist/theme/failure.css";
import "react-simple-toasts/dist/theme/success.css";
import { Link } from "react-router-dom";

function UsersLibrary() {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:3000/api/books/members/getbooks",
        {
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      toast(data.message, { theme: "success" });
      console.log("Fetched Books:", data);
      setBooks(data);
    } catch (error) {
      toast(error.message, { theme: "failure" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <div className="getMembersContainer">
        <div className="title">
          <h3 className="title">
            {loading ? <p>Please wait...</p> : <p>See members here:</p>}
          </h3>
          <div className="seeContainers">
            {books && books.length > 0
              ? books.map((currentBook, index) => (
                  <div className="ActualContainers" key={index}>
                    <div className="bookImage">
                      <img
                        src={currentBook.image}
                        alt={`image of ${currentBook.title} book`}
                      />
                    </div>
                    <div className="bookDetails">
                      <h3>{currentBook.title}</h3>
                      <p>{currentBook.description}</p>
                      <h5>${currentBook.amount} per/day</h5>
                      <Link to={`/Booking/${currentBook.id}`}>
                        <button>rent now</button>
                      </Link>
                    </div>
                  </div>
                ))
              : !loading && <p>No books available</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersLibrary;
