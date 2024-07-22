import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../../server/src/Authentication/Authentication";

function Header() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <div className="headerContainer">
        <div className="logo">
          <h2>book lovers hub</h2>
        </div>
        <div className="navLinks">
          <ul>
            <li>
              {" "}
              <Link to="/" className="link">
                home
              </Link>
            </li>
          </ul>
          <div className="buttonlinks">
            {isLoggedIn ? (
              <button className="link" onClick={handleLogout}>
                Log Out
              </button>
            ) : (
              <div className="render">
                <Link to="/Register" className="link">
                  <button>sign up</button>
                </Link>

                <Link to="/Login" className="link">
                  <button>sign in</button>
                </Link>
              </div>
            )}
            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
