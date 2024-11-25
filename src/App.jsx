import { useState, useEffect } from 'react';
import { WeatherProvider } from './components/WeatherApp/context/WeatherContext';
import WeatherApp from './components/WeatherApp';
import './App.css';

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check for system dark mode preference
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedDarkMode = localStorage.getItem('darkMode');
    
    if (storedDarkMode === null && isDarkMode) {
      localStorage.setItem('darkMode', 'true');
      document.documentElement.classList.add('dark');
    } else if (JSON.parse(storedDarkMode)) {
      document.documentElement.classList.add('dark');
    }
    
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <WeatherProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="container mx-auto px-4 py-8">
          <WeatherApp />
        </div>
      </div>
    </WeatherProvider>
  );
}

export default App;