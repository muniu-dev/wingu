import React, { useState } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

const SearchBar = () => {
  const { 
    city, 
    setCity, 
    fetchWeather,
    fetchWeatherByLocation,
    error,
    favorites, 
    setFavorites 
  } = useWeather();

  const [localCity, setLocalCity] = useState(city);

  const handleSearch = () => {
    if (localCity.trim()) {
      fetchWeather(localCity.trim());
    }
  };

  const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByLocation(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const addToFavorites = () => {
    if (localCity.trim() && !favorites.includes(localCity.trim())) {
      setFavorites([...favorites, localCity.trim()]);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={localCity}
            onChange={(e) => setLocalCity(e.target.value)}
            placeholder="Enter city name..."
            className="w-full p-3 pr-10 rounded-lg border 
              dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          {localCity && (
            <button
              onClick={() => setLocalCity('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 
                text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          disabled={!localCity.trim()}
        >
          <Search className="w-5 h-5" />
        </button>
        <button
          onClick={getCurrentLocationWeather}
          className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          <MapPin className="w-5 h-5" />
        </button>
        <button
          onClick={addToFavorites}
          className="p-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          disabled={!localCity.trim() || favorites.includes(localCity.trim())}
        >
          ⭐
        </button>
      </div>
      {error && (
        <div className="mt-2 text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default SearchBar;