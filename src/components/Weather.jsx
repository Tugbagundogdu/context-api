import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = 'feea660e6c31c0917c6ea36098e881c3'; 

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Istanbul');

  useEffect(() => {
    getWeatherData(city);
  }, [city]);

  const getWeatherData = (selectedCity) => {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${API_KEY}&units=metric`)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);
  };

  return (
    <div className="weather-container">
      <h1>Weather Forecast</h1>
      <div className="city-dropdown">
        <label>Select a city:</label>
        <select value={city} onChange={handleCityChange}>
          <option value="Istanbul">Istanbul</option>
          <option value="Berlin">Berlin</option>
          <option value="Paris">Paris</option>
          <option value="London">London</option>
          <option value="New York">New York</option>
          <option value="Tokyo">Tokyo</option>
        </select>
      </div>
      {weatherData && (
        <div className="weather-info">
          {weatherData.list.map((forecast, index) => (
            <div key={index} className={`day-card ${index === 0 ? 'current-day' : ''}`}>
              <p>{new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}</p>
              <img
                src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                alt={forecast.weather[0].description}
              />
              <p>High: {forecast.main.temp_max}°C</p>
              <p>Low: {forecast.main.temp_min}°C</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Weather;
