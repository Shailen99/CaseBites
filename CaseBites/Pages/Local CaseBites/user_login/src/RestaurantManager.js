import React, { useEffect, useState } from "react";
import "./RestaurantManager.css";

const RestaurantManager = () => {
  const [restaurantData, setRestaurantData] = useState(null);

  const username = "test1";

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
      <nav>
        <div className="sidebar">
          <li>
            <a href="/"> Dashboard </a>
          </li>
          <li>
            <a href="/"> View Feedback </a>
          </li>
          <li>
            <a href="/"> Reviews </a>
          </li>
          <li>
            <a href="/"> View/Edit Menu </a>
          </li>
          <li>
            <a href="/"> Working Hours </a>
          </li>
          <li>
            <a href="/"> Settings </a>
          </li>
        </div>
      </nav>
      <div className="content">
        <h1>CaseBites</h1>
        <h2>{restaurantData.Name}</h2>
      </div>
      <div className="image">
        <img
          src="https://www.pbs.org/wgbh/nova/media/images/JWST_hero.width-2000.jpg"
          alt="Trulli"
          width="800"
          height="300"
        />
      </div>
      <div className="order">
        <h1>Pickup Order Time</h1>
        <h3>Working Hours</h3>
        <p>{restaurantData.currentWorkingHours}</p>
        <h3>Popular Items</h3>
        <p>{restaurantData.popularItems}</p>
        <h3>Wait Time</h3>
        <p>{restaurantData.waitTime}</p>
        <h3>Pay Options</h3>
        <p>{restaurantData.paymentOptions}</p>
      </div>

      <div className="ss">
        <p>Your Contact information</p>
        <p>Email: {restaurantData.email}</p>
        <p>Phone Number: {restaurantData.phoneNum}</p>
      </div>
      <div className="public-profile">
        <p> Public profile </p>
        <p> View public profile </p>
      </div>
      <div className="terms">
        <p> Terms and agreements </p>
        <a href="https://www.w3schools.com/">View terms and agreements</a>
      </div>
    </div>
  );
};

export default RestaurantManager;
