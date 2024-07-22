import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";
import "react-simple-toasts/dist/theme/failure.css";
import "react-simple-toasts/dist/theme/success.css";
import AuthContext from "../../../../server/src/Authentication/Authentication";
import { useNavigate } from "react-router-dom";

function Booking() {
  const { id } = useParams();
  const { isLoggedIn } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [rentDate, setRentDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const navigate = useNavigate();

  const getBook = async () => {
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

    const currentDate = new Date().toISOString().split("T")[0];

    if (rentDate < currentDate) {
      toast("Rent date cannot be in the past", { theme: "failure" });
      return;
    }

    if (new Date(returnDate) <= new Date(rentDate)) {
      toast("Return date must be after rent date", { theme: "failure" });
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/booking/members/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: localStorage.getItem("id"),
            bookId: id,
            amount: book.amount,
            title: book.title,
            rentDate,
            returnDate,
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
        toast("Booking successful", { theme: "success" });
        navigate("/UsersLibrary");
      } else {
        toast(data.message, { theme: "failure" });
      }
    } catch (error) {
      console.log("Error booking:", error);
      toast(error.message, { theme: "failure" });
    }
  };

  useEffect(() => {
    getBook();
  }, [id]);

  return (
    <div className="bookingContainer">
      <div className="title">
        <h3>Book here</h3>
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

              <label htmlFor="bookid">Book ID</label>
              <input type="text" value={id} readOnly />

              <label htmlFor="rentdate">Rent Date</label>
              <input
                type="date"
                id="rentdate"
                value={rentDate}
                onChange={(e) => setRentDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                required
              />

              <label htmlFor="returndate">Return Date</label>
              <input
                type="date"
                id="returndate"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                required
              />

              {isLoggedIn && (
                <input
                  type="text"
                  id="userId"
                  value={localStorage.getItem("id")}
                  readOnly
                />
              )}

              <button type="submit">Book Now</button>
            </form>
          </>
        ) : (
          <p>Book not found</p>
        )}
      </div>
    </div>
  );
}

export default Booking;
