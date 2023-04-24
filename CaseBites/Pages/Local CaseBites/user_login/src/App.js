import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Map from './Map';

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [restaurantData, setRestaurantData] = useState(null);

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

  if (userInfo == null || restaurantData == null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Map userInfo={userInfo} restaurantData={restaurantData} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
