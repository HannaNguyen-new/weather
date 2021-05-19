import "./scss/App.scss";
import DaysBar from "./components/DaysBar";
import HoursSlider from "./components/HoursSlider";
import MainDisplay from "./components/MainDisplay";
import SearchBar from "./components/SearchBar";
import SearchHistory from "./components/SearchHistory";
import WeatherCard from "./components/WeatherCard";
import { useState, useEffect } from "react";

function App() {
  const [data, updateData] = useState({})
  const [isLoaded, updateStatus] = useState(false)
  async function fetchWeather(){
   const geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=fukuoka&appid=b215978ae0b5adea831c87cd99ac6d51";
    const response = await fetch(geoUrl)
    const coordinates = await response.json()
    
    const { lat, lon } = coordinates[0]
    
   const url =  "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely&appid=b215978ae0b5adea831c87cd99ac6d51"
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
    .then(res => {
      updateData(res)
      updateStatus(true)
    })
    .catch(err => err.message)

  }, [])


  
  if(isLoaded){
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
}else{
  return null
}
}

export default App;
