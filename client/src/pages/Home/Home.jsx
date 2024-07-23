import React from "react";
import { useNavigate, Link } from "react-router-dom";
import book1 from "../../assets/book8.jpg";
import "./Home.css";
function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="homeContainer">
        <div className="actualHome">
          <div className="homeimg">
            <img src={book1} alt="image of a book" />
          </div>
          <div className="homeInfo">
            <h4>welcome , book lovers</h4>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto
              eius nobis, facilis consequatur corporis voluptatibus qui libero
              corrupti doloribus at!
            </p>
            <Link to="/Register">
              <button>get started</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
