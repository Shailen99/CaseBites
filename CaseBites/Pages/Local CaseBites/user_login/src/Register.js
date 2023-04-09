import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import toastr from 'toastr';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  const validateUsername = () => {
    const usernameRegex = /^[a-zA-Z0-9_]{5,20}$/;
    if (username === '') {
      setUsernameError(null);
    } else if (!usernameRegex.test(username)) {
      setUsernameError('Invalid username format (5-20 alphanumeric characters or underscore)');
    } else {
      setUsernameError(null);
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (password === '') {
      setPasswordError(null);
    } else if (!passwordRegex.test(password)) {
      setPasswordError('Invalid password format (at least 8 characters including at least 1 uppercase letter, 1 lowercase letter, and 1 number)');
    } else {
      setPasswordError(null);
    }
  };

  const validateConfirmPassword = () => {
    if (confirmPassword === '') {
      setConfirmPasswordError(null);
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateUsername();
    validatePassword();
    validateConfirmPassword();
    if (!usernameError && !passwordError && !confirmPasswordError && username !== '' && password !== '' && confirmPassword !== '') {
      fetch('http://localhost:3000/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _name: username,
          _pass: password
        })
      })
      .then(response => {
        if (response.ok) {
          toastr.success('Registration successful!');
          navigate('/');
        } 
        else if (response.status === 409) {
          setUsernameError('Username already taken');
        }
        else {
          console.log('Fetch was not successful. Status code: ' + response.status);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      })
    }
    else {
      if (username === '') {
        setUsernameError('Username field cannot be empty');
      }
      if (password === '') {
        setPasswordError('Password field cannot be empty');
      }
      if (confirmPassword === '') {
        setConfirmPasswordError('Confirm password field cannot be empty');
      }
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    if (usernameError) {
      setUsernameError(null);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (passwordError) {
      setPasswordError(null);
    }
    if (confirmPasswordError) {
      setConfirmPasswordError(null);
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    if (confirmPasswordError) {
      setConfirmPasswordError(null);
    }
  };

  return (
    <div className="register">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 className="register-heading">User Registration</h1>
        <div className="register-input">
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            autoComplete="off"
            spellCheck="false"
            onChange={handleUsernameChange}
            onBlur={validateUsername}
          />
          {usernameError && <p className="error-message" style={{ display: "block" }}>{usernameError}</p>}
        </div>
        <div className="register-input">
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={validatePassword}
          />
          {passwordError && <p className="error-message" style={{ display: "block" }}>{passwordError}</p>}
        </div>
        <div className="register-input">
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            onBlur={validateConfirmPassword}
          />
          {confirmPasswordError && <p className="error-message" style={{ display: "block" }}>{confirmPasswordError}</p>}
        </div>
        <button className="register-button" type="submit">Register</button>
        <div className="form-text">
          <p style={{ fontSize: "15px" }}>Already have an account?&nbsp;<Link style={{ fontSize: "15px", color: "#90EE90" }} to="/">Login Here!</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Register;
