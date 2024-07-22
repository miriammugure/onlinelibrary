import React from "react";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("access_token");

    navigate("/Login");
  };
  return (
    <div>
      <p>welcome home</p>
      <button onClick={logout}>log out</button>
    </div>
  );
}

export default Home;
