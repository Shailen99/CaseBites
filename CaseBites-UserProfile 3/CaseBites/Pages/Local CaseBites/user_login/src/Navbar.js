import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  let username = JSON.parse(localStorage.getItem("username"));
  let userType = localStorage.getItem("userType");
  function onLogout() {
    localStorage.clear();
    username = null;
    refreshPage();
  }

  const refreshPage = () => {
    navigate(0);
  };
  //check if this is a restaurant account or user account
  var userTrue = false;
  var resTrue = false;
  if(userType == "restaurantAccount")
  {
    resTrue = true;
    userTrue = false;
  }
  else if(userType == "customerAccount")
  {
    userTrue = true;
    resTrue = false;
  }

  return (
    <nav>
      <ul>
        <li>
          <a href="/">Map</a>
        </li>
        {resTrue && !userTrue && (<li><a href="/restaurantManager">Restaurant Manager</a></li>)}
        {userTrue && !resTrue && (<li><a href="/">User Profile</a></li>)}

        {!username && (
          <li className="right">
            <a href="/register">Register User</a>
          </li>
        )}
        {!username && (
          <li className="right">
            <a href="/changeLogInPage">Login</a>
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
  // {username}
}

export default Navbar;
