import React, { createContext, useContext, useState, useEffect } from 'react';

const WeatherContext = createContext();

const INITIAL_CITIES = [
  'London', 'Tokyo', 'New York', 'Paris', 'Sydney', 
  'Dubai', 'Singapore', 'Mumbai', 'Rio de Janeiro', 'Cape Town',
  'Toronto', 'Berlin', 'Moscow', 'Seoul', 'Bangkok'
];

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState(() => 
    localStorage.getItem('weatherUnit') || 'metric'
  );
  const [darkMode, setDarkMode] = useState(() => 
    JSON.parse(localStorage.getItem('darkMode')) || false
  );
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem('favorites')) || []
  );

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
      setCity(searchCity);
      
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

  // Load random cities on initial mount
  useEffect(() => {
    const loadRandomCities = async () => {
      const randomCities = [...INITIAL_CITIES]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
      
      // Fetch weather for the first city
      await fetchWeather(randomCities[0]);
      
      // Update favorites with the random cities if favorites is empty
      if (favorites.length === 0) {
        setFavorites(randomCities);
        localStorage.setItem('favorites', JSON.stringify(randomCities));
      }
    };

    loadRandomCities();
  }, []);

  // Persist dark mode
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Persist unit preference
  useEffect(() => {
    localStorage.setItem('weatherUnit', unit);
  }, [unit]);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

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