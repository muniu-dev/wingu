import React, { createContext, useContext, useState, useEffect } from 'react';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // API configuration
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const BASE_URL = 'https://api.openweathermap.org/data/2.5';

  const fetchWeather = async (searchCity) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `${BASE_URL}/weather?q=${searchCity}&appid=${API_KEY}&units=${unit}`
      );
      
      if (!response.ok) throw new Error('City not found');
      
      const data = await response.json();
      setWeather(data);
      
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?q=${searchCity}&appid=${API_KEY}&units=${unit}`
      );
      const forecastData = await forecastResponse.json();
      setForecast(forecastData);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    city, setCity,
    weather, setWeather,
    forecast, setForecast,
    loading, setLoading,
    error, setError,
    unit, setUnit,
    darkMode, setDarkMode,
    favorites, setFavorites,
    fetchWeather
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};