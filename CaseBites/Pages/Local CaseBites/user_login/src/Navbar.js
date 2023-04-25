import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  let username = JSON.parse(localStorage.getItem("username"));

  function onLogout() {
    localStorage.clear();
    username = null;
    refreshPage();
  }

  const refreshPage = () => {
    navigate(0);
  };

  return (
    <nav>
      <ul>
        <li>
          <a href="/">Map</a>
        </li>
        {!username && (
          <li className="right">
            <a href="/register">Register</a>
          </li>
        )}
        {!username && (
          <li className="right">
            <a href="/ChangeLogInPage">Login</a>
          </li>
        )}
        {username && <button onClick={onLogout}>Log out</button>}
        {username && (
          <li className="right">
            <span>Welcome, {username}!</span>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
