import { useState, useEffect } from 'react'
import WeatherApp from './components/WeatherApp'
import './App.css'

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <WeatherApp />
    </div>
  )
}

export default App