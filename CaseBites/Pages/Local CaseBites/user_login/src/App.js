import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Map from './Map';
import Navbar from './Navbar';

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/userInformation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: localStorage.getItem('username')
        })
    })
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

  if (userInfo == null || restaurantData == null) {
    return null;
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Map userInfo={userInfo} restaurantData={restaurantData} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
