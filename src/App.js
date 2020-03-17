import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import './css/tailwind.css';
import Home_Component from './component/Home_Component';
import Status_Component from './component/Status_Component';

function App() {

  const [coordinate, setCoordinate] = useState({
    latitude: 0,
    longitude: 0
  })

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoordinate({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      console.log(coordinate)
    })
  }

  return (
    <Router>
      <Route exact path="/" component={Home_Component} coordinate={coordinate}/>
      <Route path="/status/" component={Status_Component} coordinate={coordinate}/>
    </Router>
  );
}

export default App;
