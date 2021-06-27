import "./scss/App.scss";
import DaysBar from "./components/DaysBar";
import HoursSlider from "./components/HoursSlider";
import MainDisplay from "./components/MainDisplay";
import SearchBar from "./components/SearchBar";
import SearchHistory from "./components/SearchHistory";
import WeatherCard from "./components/WeatherCard";
import { useState, useEffect } from "react";

function App() {
  const [data, updateData] = useState(fetchWeather())
  async function fetchWeather(){
   const geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=fukuoka&appid=59eeb0d41084e9b5bdbb46f896deec21";
    const response = await fetch(geoUrl)
    const coordinates = await response.json()
    console.log(coordinates)
    const { lat, lon } =  coordinates[0]
    
   const url =  "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely&appid=59eeb0d41084e9b5bdbb46f896deec21"
    const result = await fetch(url)
    const weatherData = await result.json()
    .then(res => res)

    if(!response.ok || !result.ok){
      const message = `Error: ${response.status || result.status}`
      throw new Error(message)
    }
    return weatherData
  
  }

  useEffect(() => {
    fetchWeather()
    .then(res => updateData(res))
    .catch(err => err.message)

  }, [])


  

  return (
    <div className="App">
      <div className='container'>
      <SearchBar />
      <WeatherCard content={data} />
      <SearchHistory />
      <DaysBar/>
      <HoursSlider/>
      <MainDisplay/>

      </div>
    </div>
  );
}

export default App;
