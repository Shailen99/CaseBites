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

  const [onMealPlan, setOnMealPlan] = useState(false);
  const [caseCash, setCaseCash] = useState(null);
  const [caseCashError, setCaseCashError] = useState(null);
  const [mealPlan, setMealPlan] = useState(null);

  const handleOnMealPlanChange = (event) => {
    setOnMealPlan(event.target.checked);
    if (!onMealPlan) {
      setCaseCash(null);
      setCaseCashError(null);
      setMealPlan(null);
    }
  }

  const handleMealPlanChange = (event) => {
    setMealPlan(event.target.value);
  }

  const validateCaseCash = () => {
    if (caseCash < 0) {
      setCaseCashError('CaseCash cannot be negative');
    }
    else {
      setCaseCashError(null);
    }
  }

  const handleCaseCashChange = (event) => {
    setCaseCash(event.target.value);
  }

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

  function handleSubmitHelper() {
    if (onMealPlan) {
      return (!usernameError && !passwordError && !confirmPasswordError && !caseCashError && username !== '' && password !== '' && confirmPassword !== '' && caseCash !== '');
    }
    else {
      return (!usernameError && !passwordError && !confirmPasswordError && username !== '' && password !== '' && confirmPassword !== '');
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    validateUsername();
    validatePassword();
    validateConfirmPassword();
    validateCaseCash();
    if (handleSubmitHelper()) {
      fetch('http://localhost:3000/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: username,
          pass: password,
          onMealPlan: onMealPlan,
          caseCash: caseCash,
          mealPlan: mealPlan,
          points: 0
        })
      })
      .then(response => {
        if (response.ok) {
          toastr.success('Registration successful!');
          localStorage.setItem('username', JSON.stringify(username));
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
        <div style={{ marginBottom: "10px" }}>
          Track your meal plan info?&nbsp;&nbsp;&nbsp;
          <input type="checkbox" id="onMealPlan" onChange={handleOnMealPlanChange}/>
          <label htmlFor="onMealPlan">Yes</label>
        </div>
        {onMealPlan &&
          <div className="register-input">
            <input
              type="number"
              id="caseCash"
              placeholder="CaseCash ($)"
              value={caseCash}
              onChange={handleCaseCashChange}
              onBlur={validateCaseCash}
              style={{ marginRight: "0px" }}
            />
            {caseCashError && <p className="error-message" style={{ display: "block" }}>{caseCashError}</p>}
          </div>
        }
        {onMealPlan &&
          <div style={{ marginBottom: "25px" }}>
            <label htmlFor="mealPlanSelection">Meal Plan:&nbsp;</label>
            <select name="mealPlanSelection" id="mealPlanSelection" className="mealPlanSelection" onChange={handleMealPlanChange} required>
              <option hidden disabled selected value="">Please select your meal plan.</option>
              <option value="Unlimited">Unlimited</option>
              <option value="10 Classic">10 Classic</option>
              <option value="14 Classic">14 Classic</option>
              <option value="17 Classic">17 Classic</option>
              <option value="10 Halal/Kosher">10 Halal/Kosher</option>
              <option value="14 Halal/Kosher">14 Halal/Kosher</option>
              <option value="Apartment 5/3/150">Apartment 5/3/150</option>
              <option value="Apartment 7/5/100">Apartment 7/5/100</option>
              <option value="Greek 5">Greek 5</option>
            </select>
          </div>
        }
        <button className="register-button" type="submit">Register</button>
        <div className="form-text">
          <p style={{ fontSize: "15px" }}>Already have an account?&nbsp;<Link style={{ fontSize: "15px", color: "#90EE90" }} to="/">Login Here!</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Register;
