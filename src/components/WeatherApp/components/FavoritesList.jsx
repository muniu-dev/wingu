import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { X } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

const FavoritesList = () => {
  const { favorites, setFavorites, setCity, fetchWeather } = useWeather();

  const removeFromFavorites = (cityToRemove) => {
    const newFavorites = favorites.filter(city => city !== cityToRemove);
    setFavorites(newFavorites);
  };

  if (favorites.length === 0) return null;

  return (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <h3 className="font-semibold mb-2">Favorite Cities</h3>
        <div className="flex flex-wrap gap-2">
          {favorites.map(city => (
            <div
              key={city}
              className="group flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm"
            >
              <button
                onClick={() => {
                  setCity(city);
                  fetchWeather(city);
                }}
                className="hover:text-blue-500 dark:hover:text-blue-400"
              >
                {city}
              </button>
              <button
                onClick={() => removeFromFavorites(city)}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                  hover:text-red-500 dark:hover:text-red-400 ml-1"
                aria-label={`Remove ${city} from favorites`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FavoritesList;