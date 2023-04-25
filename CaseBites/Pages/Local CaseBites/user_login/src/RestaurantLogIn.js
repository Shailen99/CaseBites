import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const RestaurantLogIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!error && username !== "" && password !== "") {
      fetch("http://localhost:3000/validateRestaurant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          pass: password,
        }),
      })
        .then((response) => {
          if (response.ok) {
            localStorage.setItem("username", JSON.stringify(username));
            navigate("/restaurantManager");
            window.location.reload();
          } else if (response.status === 401) {
            setError("Invalid username and/or password");
          } else {
            console.log(
              "Fetch was not successful. Status code: " + response.status
            );
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      if (username === "") {
        setUsernameError("Username field cannot be empty");
      }
      if (password === "") {
        setPasswordError("Password field cannot be empty");
      }
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    if (usernameError) {
      setUsernameError(null);
    }
    if (error) {
      setError(null);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (passwordError) {
      setPasswordError(null);
    }
    if (error) {
      setError(null);
    }
  };

  return (
    <div className="register">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 className="register-heading">Restaurant Login</h1>
        <p className="error-message" style={{ display: "block" }}>
          {error}
        </p>
        <div className="register-input">
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            autoComplete="off"
            spellCheck="false"
            onChange={handleUsernameChange}
          />
          {usernameError && (
            <p className="error-message" style={{ display: "block" }}>
              {usernameError}
            </p>
          )}
        </div>
        <div className="register-input">
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && (
            <p className="error-message" style={{ display: "block" }}>
              {passwordError}
            </p>
          )}
        </div>
        <button className="register-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default RestaurantLogIn;
