import './App.css';
import Search from './components/search/search';
import Forecast from './components/forecast/forecast';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import { useState } from 'react';

function App() {
  // const cors = require('cors');
  // App.use(cors());

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {

    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch(console.log);
  };

  const showPMAcceleratorInfo = () => {
    alert(`PM Accelerator is dedicated to empowering product managers with AI-driven technologies to accelerate their product development processes. Visit our LinkedIn page for more information.`);
  };

  return (
    <div className="container">

      {/* Header */}
      <header className="app-header">
        <h1>Welcome to Weather App</h1>
        <h5>By Prathamesh Sawant</h5>
        
      <button onClick={showPMAcceleratorInfo} className="info-button">
        Info
      </button>
      </header>

      {/* <button onClick={showPMAcceleratorInfo} className="info-button">
        Info
      </button> */}

      <Search onSearchChange={handleOnSearchChange}/>
      {/* <CurrentWeather/> */}
      
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
