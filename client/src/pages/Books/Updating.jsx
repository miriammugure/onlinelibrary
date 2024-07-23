import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";
import "react-simple-toasts/dist/theme/failure.css";
import "react-simple-toasts/dist/theme/success.css";
import { useNavigate } from "react-router-dom";

function Updating() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const getUpdateBook = async () => {
    try {
      console.log(`Fetching book with ID: ${id}`);
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
      console.log("Fetched Book Data:", data);
      toast(data.message, { theme: "success" });
      setBook(data);
    } catch (error) {
      console.log("Error fetching book:", error);
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
          body: JSON.stringify({
            image: book.image,
            amount: book.amount,
            title: book.title,
            description: book.description,
          }),
          credentials: "include",
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response:", errorText);
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
      console.log("Error updating:", error);
      toast(error.message, { theme: "failure" });
    }
  };

  useEffect(() => {
    getUpdateBook();
  }, [id]);

  return (
    <div className="bookingContainer">
      <div className="title">
        <h3>update book</h3>
      </div>
      <div className="actualBooking">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading book</p>
        ) : book ? (
          <>
            <form onSubmit={handleSubmit}>
              <label htmlFor="title">Title</label>
              <input type="text" value={book.title} readOnly />

              <label htmlFor="amount">Amount</label>
              <input type="text" value={book.amount} readOnly />

              <label htmlFor="description">description</label>
              <input type="text" value={book.description} />

              <label htmlFor="image">image</label>
              <input type="file" value={book.image} />

              <button type="submit">update book</button>
            </form>
          </>
        ) : (
          <p>Book not found</p>
        )}
      </div>
    </div>
  );
}

export default Updating;
