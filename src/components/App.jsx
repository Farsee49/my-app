
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import { Box, Container, Typography, Card } from '@mui/material';
import { 
  Navbar,
  Home,
  Register,
  Login
 } from './index';
 import { getUserMe } from '../axios/Users';




    export default function App() {
      const navigate = useNavigate();
      const [user, setUser] = useState(null);
      const [isLoggedIn, setIsLoggedIn] = useState(false);
      const [isAuth, setIsAuth] = useState(false);
      const [error, setError] = useState(null);
      const [message, setMessage] = useState(null);
      const [loading, setLoading] = useState(false);

                              console.log('App user state top:', user);

                              // get weather data according to the location
function getWeather(lat, long) {
  const root = "https://fcc-weather-api.glitch.me/api/current?";
  fetch(`${root}lat=${lat}&lon=${long}`, { method: "get" })
    .then(resp => resp.json())
    .then(data => {
      updateDataToUI(data.name, data.weather, data.main.temp);
    })
    .catch(function(err) {
      console.error(err);
    });
}

      // get location
function getLocation() {
  console.log("Getting location...", navigator.geolocation);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
       getWeather(position.coords.latitude, position.coords.longitude);
      
    });
  } else {
    //loc.innerHTML = "Geolocation is not supported by this browser.";
    console.log("Geolocation is not supported by this browser.");
  }
}


      useEffect(() => {
        const fetchCurrentUser = async () => {
          setLoading(true);
          try {
            const response = await getUserMe();
            console.log('Fetched user in App.jsx useEffect:', response);
            setUser(response.user);
            setIsLoggedIn(true);
            setIsAuth(true);
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        };
        fetchCurrentUser();
        getLocation();
      }, []);
                        console.log('App user state bottom:', user);
      return (
        <>
            <div>
              <Navbar
               user={user}
               isLoggedIn={isLoggedIn}
               setUser={setUser}
               setIsLoggedIn={setIsLoggedIn}
               setError={setError}
               setMessage={setMessage}
               navigate={navigate}
              />
            </div> 
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register
               setUser={setUser}
               setIsLoggedIn={setIsLoggedIn}
               setError={setError}
               setMessage={setMessage}
               navigate={navigate}
               error={error}
               message={message}
              />} />
              <Route path="/login" element={<Login
               setUser={setUser}
               setIsLoggedIn={setIsLoggedIn}
               setError={setError}
               setMessage={setMessage}
               navigate={navigate}
               error={error}
               message={message}
              />} />
            </Routes>
        </>
      );
    }