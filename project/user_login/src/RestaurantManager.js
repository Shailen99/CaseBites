import React, { useEffect, useState } from "react";
import "./RestaurantManager.css";
import { useNavigate } from "react-router-dom";

const RestaurantManager = () => {
  const [restaurantData, setRestaurantData] = useState(null);

  const username = "test1";
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/restaurantSettings`; 
    navigate(path);
  }

  useEffect(() => {
    fetch("http://localhost:3000/getResName", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    })
      .then((response) => response.json())
      .then((data) => setRestaurantData(data))
      .catch((error) => console.error(error));
  }, []);

  if (restaurantData == null) {
    return;
  }

  return (
    <div>
      <title>CaseBites</title>
      <div className="titleSection">
        <h1>CaseBites</h1>
        <h2>{restaurantData.Name}</h2>
      </div>
<div className="wrapper">
      <div className="orderSection">
        <h1>Order Management</h1>
        <h3>Working Hours</h3>
        <p>{restaurantData.currentWorkingHours}</p>
        <h3>Popular Items</h3>
        <p>{restaurantData.popularItems}</p>
        <h3>Wait Time</h3>
        <p>{restaurantData.waitTime}</p>
        <h3>Pay Options</h3>
        <p>{restaurantData.paymentOptions}</p>
        <button onClick={routeChange} id="myButton" class="float-left submit-button" >Edit Your Settings</button>

      </div>

     <div className="Personal">
     <h1>Your Information</h1>
        <h3>Your Contact Unformation</h3>
        <p><b>Email:</b> {restaurantData.email}</p>
        <p><b>Phone Number:</b> {restaurantData.phoneNum}</p>
        <h3> Public Profile </h3>
        <a href ="/"> <p> View public profile </p></a>
        </div>
        </div>
        </div>
  );
};

export default RestaurantManager;
