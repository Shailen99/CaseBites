import React, { useEffect, useState } from "react";
import "./Map.css";

window.initMap = function () {};

const Map = ({ userInfo, restaurantData }) => {
  const [createdMap, setCreatedMap] = useState(null);
  const [portSwipes, setPortSwipes] = useState(userInfo.portSwipes);
  const [mealSwipes, setMealSwipes] = useState(userInfo.mealSwipes);

  useEffect(() => {
    const options = {
      zoom: 15,
      center: { lat: 41.507213, lng: -81.606955 },
      streetViewControl: false,
      //Hide Default Google Maps Icons
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          stylers: [{ visibility: "off" }],
        },
      ],
    };

    if (document.getElementById("map") == null) {
      const mapDiv = document.createElement("div");
      mapDiv.id = "map";
      document.body.appendChild(mapDiv);

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyB2zN4XibhG6DPOVT9Xy_smKHsgNEXMwGY&callback=initMap";
      script.async = true;
      script.onload = () => {
        const createdMap = new window.google.maps.Map(mapDiv, options);
        setCreatedMap(createdMap);
      };
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (createdMap == null) {
      return;
    }

    function addMarker(
      name,
      location,
      payOptions,
      hours,
      popItems,
      waitTime,
      img
    ) {
      const coords = location;
      img = img.replace(/&amp;/g, "&");
      const [lat, lng] = coords.split(", ");
      const formattedCoords = { lat: Number(lat), lng: Number(lng) };
      location = formattedCoords;

      var marker = new window.google.maps.Marker({
        position: location,
        map: createdMap,
        icon: img,
      });

      const contentString = `<div>
          <h1 id="resName">${name}</h1>
          <p>Payment Options: ${payOptions}</p>
          <p>Hours: ${hours}</p>
          <p>Popular Items: ${popItems}</p>
          <p>Est. Wait Time: ${waitTime}</p>
          <a href="/restaurantManager">
            <button>Check Reviews</button>
          </a>
        </div>`;

      var infoWindow = new window.google.maps.InfoWindow({
        content: contentString,
      });

      marker.addListener("click", function () {
        infoWindow.open(createdMap, marker);
        console.log(infoWindow.content);
      });
    }
    try {
      restaurantData.forEach((restaurant) => {
        addMarker(
          restaurant.name,
          restaurant.location,
          restaurant.payOptions,
          restaurant.hours,
          restaurant.popItems,
          restaurant.waitTime,
          restaurant.img
        );
      });
    } catch (error) {
      console.log(error);
    }
  }, [restaurantData, createdMap]);

  function decrementPortSwipe() {
    if (portSwipes > 0) {
      fetch("http://localhost:3000/usedPortSwipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: localStorage.getItem("username"),
        }),
      }).catch((error) => console.error(error));

      setPortSwipes(portSwipes - 1);
    }
  }

  function decrementMealSwipe() {
    if (mealSwipes !== "Unlimited" && mealSwipes > 0) {
      fetch("http://localhost:3000/usedMealSwipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: localStorage.getItem("username"),
        }),
      }).catch((error) => console.error(error));

      setMealSwipes(mealSwipes - 1);
    }
  }

  function resetSwipes() {
    fetch("http://localhost:3000/resetSwipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: localStorage.getItem("username"),
      }),
    }).catch((error) => console.error(error));

    setMealSwipes(userInfo.mealPlanMealSwipes);
    setPortSwipes(userInfo.mealPlanPortSwipes);
  }

  const loggedIn = localStorage.getItem("username") !== null;

  return (
    <div>
      <title>My Google Maps</title>
      <div className="well" id="studentInfo">
        {!loggedIn && (
          <div style={{ fontSize: "24px" }}>
            Log in to track your meal plan.
          </div>
        )}
        <div id="header">Your Info</div>
        <div>CaseCash: {userInfo.caseCash}</div>
        <div>Portable Swipes: {portSwipes}</div>
        <div>Meal Swipes: {mealSwipes}</div>
        <div>Review Points: {userInfo.reviewPoints}</div>
        <center>
          <div>
            <button className="mapButton" onClick={decrementPortSwipe}>
              Used Portable Swipe
            </button>
          </div>
          <div>
            <button className="mapButton" onClick={decrementMealSwipe}>
              Used Meal Swipe
            </button>
          </div>
          <div>
            <button className="mapButton" onClick={resetSwipes}>
              Reset Swipes
            </button>
          </div>
        </center>
      </div>
    </div>
  );
};

export default Map;
