import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";
import "react-simple-toasts/dist/theme/failure.css";
import "react-simple-toasts/dist/theme/success.css";

function Updating() {
  const { id } = useParams();
  const [book, setBook] = useState({
    image: "",
    title: "",
    description: "",
    author: "",
    amount: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const getUpdateBook = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/books/members/getbooks/${id}`,
        {
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setBook(data);
    } catch (error) {
      toast(error.message, { theme: "failure" });
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/books/updatebooks/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(book),
          credentials: "include",
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        toast("Update Successful", { theme: "success" });
        navigate("/library");
      } else {
        toast(data.message, { theme: "failure" });
      }
    } catch (error) {
      toast(error.message, { theme: "failure" });
    }
  };

  useEffect(() => {
    getUpdateBook();
  }, [id]);

  return (
    <div className="bookingContainer">
      <div className="title">
        <h3>Update Book</h3>
      </div>
      <div className="actualBooking">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading book</p>
        ) : (
          <form onSubmit={handleSubmit} className="book">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              value={book.title}
              onChange={(e) => setBook({ ...book, title: e.target.value })}
              required
            />

            <label htmlFor="amount">Amount</label>
            <input
              type="text"
              value={book.amount}
              onChange={(e) => setBook({ ...book, amount: e.target.value })}
              required
            />

            <label htmlFor="description">Description</label>
            <input
              type="text"
              value={book.description}
              onChange={(e) =>
                setBook({ ...book, description: e.target.value })
              }
              required
            />

            <label htmlFor="image">Image</label>
            <input
              type="text"
              value={book.image}
              onChange={(e) => setBook({ ...book, image: e.target.value })}
              required
            />

            <label htmlFor="author">Author</label>
            <input
              type="text"
              value={book.author}
              onChange={(e) => setBook({ ...book, author: e.target.value })}
              required
            />

            <button type="submit">Update Book</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Updating;
