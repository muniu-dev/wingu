import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastSection from './components/ForecastSection';
import FavoritesList from './components/FavoritesList';
import { WeatherProvider } from './context/WeatherContext';

const WeatherApp = () => {
  return (
    <WeatherProvider>
      <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <Header />
          <SearchBar />
          <FavoritesList />
          <WeatherDisplay />
          <ForecastSection />
        </div>
      </div>
    </WeatherProvider>
  );
};

export default WeatherApp;