import React, { useState, useEffect } from "react";
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";
import "react-simple-toasts/dist/theme/failure.css";
import "react-simple-toasts/dist/theme/success.css";
import Dashboard from "../../components/Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";

function Library() {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const deleteBook = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/books/deletebooks/${id}`,
        {
          credentials: "include",
          method: "DELETE",
        },
      );
      const data = await response.json();

      if (data.success) {
        toast(data.message, { theme: "success" });
        // Remove the deleted book from the state
        setBooks(books.filter((book) => book.id !== id));
      } else {
        toast(data.message, { theme: "failure" });
      }
    } catch (error) {
      toast(error.message, { theme: "failure" });
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
    fetchBooks();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/Updating/${id}`);
  };

  return (
    <div>
      <div className="getMembersContainer">
        <Dashboard />
        <div className="flexContainer">
          <div className="title">
            <h3 className="title1">
              {loading ? <p>Please wait...</p> : <p>See books here:</p>}
            </h3>
          </div>
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
                      <div className="button2">
                        <button
                          className="true"
                          onClick={() => handleUpdate(currentBook.id)}
                        >
                          update
                        </button>
                        <button
                          className="false"
                          onClick={() => deleteBook(currentBook.id)}
                        >
                          delete
                        </button>
                      </div>
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

export default Library;
