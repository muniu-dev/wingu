import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

const Header = () => {
  const { unit, setUnit, darkMode, setDarkMode } = useWeather();

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold dark:text-white">Wingu</h1>
      <div className="flex gap-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
        <button
          onClick={() => setUnit(unit === 'metric' ? 'imperial' : 'metric')}
          className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
        >
          {unit === 'metric' ? '°C' : '°F'}
        </button>
      </div>
    </div>
  );
};

export default Header;