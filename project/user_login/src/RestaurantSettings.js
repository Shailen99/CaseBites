import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const RestaurantSettings = () => {
  const username = "test1";
  const navigate = useNavigate();
  const [workingHours, setWorkingHours] = useState('');
  const [popularItems, setPopularItems] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [email, setEmail] = useState('');

  const [workingHourError, setWorkingHoursError] = useState(null);
  const [popularItemsError, setPopularItemsError] = useState(null);
  const [phoneNumberError, setPhoneNumberError] = useState(null);
  const [transactionTypeError, setTransactionTypeError] = useState(null);
  const [emailNumberError, setEmailError] = useState(null);

  const [error, setError] = useState(null);
  const [restaurantData, setRestaurantData] = useState(null);

  const handleSubmit = (event) =>{
    
    event.preventDefault();
    //only check for errors
    if (!error){
      fetch("http://localhost:3000/getResSettings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email:email,
          phoneNum:phoneNum,
          popularItems:popularItems,
          transactionType:transactionType,
          workingHours:workingHours,
        }),
      })
        .then((response) => response.json())
        .catch((error) => console.error(error));

    }

  }

  const handleWorkingHourChange = (event) => {
    setWorkingHoursError(event.target.value);
    if (workingHourError) {
      setWorkingHoursError(null);
    }
    if (error) {
      setError(null);
    }
  };
  const handlePopularItemsChange = (event) => {
    setPopularItemsError(event.target.value);
    if (popularItemsError) {
      setPopularItemsError(null);
    }
    if (error) {
      setError(null);
    }
  };
  const handlePhoneNumberChange = (event) => {
    setPhoneNumberError(event.target.value);
    if (phoneNumberError) {
      setPhoneNumberError(null);
    }
    if (error) {
      setError(null);
    }
  };
  const handleTransactionTypeChange = (event) => {
    transactionTypeError(event.target.value);
    if (transactionTypeError) {
      transactionTypeError(null);
    }
    if (error) {
      setError(null);
    }
  };
  const handleEmailChange = (event) => {
    setEmailError(event.target.value);
    if (emailNumberError) {
      setEmailError(null);
    }
    if (error) {
      setError(null);
    }
  };
  return (
    <>
      {" "}
      <center>
        <h1>Edit Your Settings</h1>
      </center>
      <form className="settingsForm" onSubmit={handleSubmit}>
        <label htmlFor="WorkingHours">Working Hours:</label>
        <input type="text" id="workingHours" value={workingHours} autoComplete="off" spellCheck="false" onChange={handleWorkingHourChange}></input>
        <label htmlFor="PopularItems">Popular Items</label>
        <input type="text" id="popularItems" value={popularItems} autoComplete="off" spellCheck="false" onChange={handlePopularItemsChange}></input>
        <label htmlFor="transactionType">Change Transaction Types</label>
        <input type="text" id="transactionType" value={transactionType} autoComplete="off" spellCheck="false" onChange={handleTransactionTypeChange}></input>
        <label htmlFor="phoneNum">Change Phone Number</label>
        <input type="text" id="phoneNum" value={phoneNum} autoComplete="off" spellCheck="false" onChange={handlePhoneNumberChange}></input>
        <label htmlFor="email">Change Email</label>
        <input type="text" id="email" value={email} autoComplete="off" spellCheck="false" onChange={handleEmailChange}></input>
        <button className="register-button" type="submit">Login</button>

      </form>
    </>
  );
};
export default RestaurantSettings;
