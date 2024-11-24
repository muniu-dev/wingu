// src/components/WeatherApp/components/FavoritesList.jsx
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useWeather } from '../context/WeatherContext';

const FavoritesList = () => {
  const { favorites, setCity, fetchWeather } = useWeather();

  if (favorites.length === 0) return null;

  return (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <h3 className="font-semibold mb-2">Favorite Cities</h3>
        <div className="flex flex-wrap gap-2">
          {favorites.map(city => (
            <button
              key={city}
              onClick={() => {
                setCity(city);
                fetchWeather(city);
              }}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {city}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FavoritesList;