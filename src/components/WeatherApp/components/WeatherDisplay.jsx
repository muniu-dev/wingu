import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, AlertTriangle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useWeather } from '../context/WeatherContext';
import { getWeatherIcon } from '../utils/weatherIcons';

const WeatherDisplay = () => {
  const { 
    weather, 
    loading, 
    error, 
    unit,
    favorites,
    setFavorites
  } = useWeather();

  const formatTemp = (temp) => {
    return `${Math.round(temp)}°${unit === 'metric' ? 'C' : 'F'}`;
  };

  const formatDateTime = (timezone) => {
    const localTime = new Date(Date.now() + timezone * 1000);
    return {
      date: localTime.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: localTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };
  };

  if (loading) {
    return (
      <div className="flex justify-center my-8">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTriangle className="w-4 h-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!weather) return null;

  const { date, time } = formatDateTime(weather.timezone);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div>
            <div>{weather.name}, {weather.sys.country}</div>
            <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {date} | {time}
            </div>
          </div>
          <button
            onClick={() => {
              const newFavorites = favorites.includes(weather.name)
                ? favorites.filter(f => f !== weather.name)
                : [...favorites, weather.name];
              setFavorites(newFavorites);
            }}
            className="hover:text-yellow-500"
          >
            <Star className={`w-6 h-6 ${favorites.includes(weather.name) ? 'text-yellow-500 fill-yellow-500' : ''}`} />
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">
              {formatTemp(weather.main.temp)}
            </div>
            <div className="text-lg">
              Feels like {formatTemp(weather.main.feels_like)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-6xl mb-2">
              {getWeatherIcon(weather.weather[0].main)}
            </div>
            <div className="text-lg capitalize">
              {weather.weather[0].description}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
          </div>
          <div>
            <p>High: {formatTemp(weather.main.temp_max)}</p>
            <p>Low: {formatTemp(weather.main.temp_min)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDisplay;