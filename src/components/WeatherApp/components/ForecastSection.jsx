// src/components/WeatherApp/components/ForecastSection.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useWeather } from '../context/WeatherContext';
import { getWeatherIcon } from '../utils/weatherIcons';

const ForecastSection = () => {
  const { forecast, unit } = useWeather();

  if (!forecast) return null;

  const dailyForecast = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = item;
    }
    return acc;
  }, {});

  const chartData = forecast.list.slice(0, 8).map(item => ({
    time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric' }),
    temp: Math.round(item.main.temp)
  }));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>5-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {Object.values(dailyForecast).map((day, idx) => (
              <div key={idx} className="text-center">
                <div className="font-semibold">
                  {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="text-2xl my-2">
                  {getWeatherIcon(day.weather[0].main)}
                </div>
                <div>
                  {Math.round(day.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>24-Hour Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <LineChart width={700} height={200} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="temp" 
                stroke="#8884d8"
                name="Temperature" 
              />
            </LineChart>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForecastSection;