import React, {useState, useEffect} from 'react';
import './Map.css';

const Map = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [restaurantData, setRestaurantData] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/userInformation')
      .then(response => response.json())
      .then(data => setUserInfo(data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/restaurantData')
      .then(response => response.json())
      .then(data => setRestaurantData(data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    const options = {
      zoom:15,
      center: {lat:41.507213,lng:-81.606955},
      streetViewControl: false,
      //Hide Default Google Maps Icons
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [
            { visibility: "off" }
          ]
        },
          {
            featureType: "transit",
            stylers: [
              { visibility: "off" }
            ]
          }
      ]
    }

    const mapDiv = document.getElementById('map');
    if (!mapDiv) {
      return;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyB2zN4XibhG6DPOVT9Xy_smKHsgNEXMwGY&callback=initMap";
    script.async = true;
    script.onload = () => {
      const map = new window.google.maps.Map(mapDiv, options);
      setMap(map);
    };
    document.body.appendChild(script);
  }, []);

  if (userInfo == null || restaurantData == null) {
    return <div id='map'></div>;
  }

  return (
    <div>
      <title>My Google Maps</title>
      <div className="well" id="studentInfo">
        <div id="header">Your Info</div>
        <div>CaseCash: {userInfo.caseCash}</div>
        <div>Portable Swipes: {userInfo.portSwipes}</div>
        <div>Meal Swipes: {userInfo.mealSwipes}</div> 
        <div>Review Points: {userInfo.reviewPoints}</div>
      </div>
      <div id="map"></div>
    </div>
  );
}

export default Map;