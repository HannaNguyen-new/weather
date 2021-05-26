import "./scss/App.scss";
import config from "./config"
import DaysBar from "./components/DaysBar";
import HoursSlider from "./components/HoursSlider";
import MainDisplay from "./components/MainDisplay";
import SearchBar from "./components/SearchBar";
import SearchHistory from "./components/SearchHistory";
import WeatherCard from "./components/WeatherCard";
import { React, useState, useEffect } from "react";

function App() {

  // get current time
  // const now = new Date().toLocaleString('en-GB', { timeZone: 'UTC' }).split(",")
  // const [date,month,year] = now[0].split('/')
  // let [hour] = now[1].split(':')
  // hour = hour.slice(1)
  // const utc = Date.UTC(year,month-1,date,hour)
  // const epoch = Math.floor(utc/1000) 
  const [currentCoords,updateCurrentCoords] = useState({})
  const [coordsFetched, updateFetchStatus] = useState(false)
  const [locationName, updateLocationName] = useState("")
  const [card1, updateCard1] = useState({})
  const [isLoaded, updateStatus] = useState(false)
  const [locationId, updateLocationId] = useState("")
  const [secondLocationName, updateSecondLocationName] = useState("")
  const [card2, updateCard2] = useState("")
// test
  const getLocationId = (id) => {
    updateLocationId(id)
  }
  useEffect(() => {
    if(locationId.length > 0) {
      const {lat,lon} = getCoords()
      .then(result => result)
      .catch(err => console.log(err))
  
      const promise1 = fetchWeather(lat, lon);
      const promise2 = findNearestCity(lat, lon);
      Promise.all([promise1,promise2])
      .then(values => {
        updateCard2(values[0]);
        updateSecondLocationName(values[1][0]);
      })
       .catch(err => err.message)

    }

    
  },[locationId])
  const getCoords = async() => {
    const url = 'https://lookup.search.hereapi.com/v1/lookup?apiKey=' + config.openAPI_key + '&id=' + locationId ;
    const result = await fetch(url)
    const coords =  result.json()
    return coords
  
  }
  const getCurrentCoords = async() => {
    navigator.geolocation.getCurrentPosition(position => {
      updateCurrentCoords(position.coords);
      updateFetchStatus(true)
    })
  }
  const findNearestCity = async(lat,lon) => {
   const url = "http://api.openweathermap.org/geo/1.0/reverse?lat=" + lat +
   "&lon=" + lon + "&limit=5&appid=" + config.openAPI_key
   const result = await fetch(url)
  const nearestCities = await result.json()
  if (!result.ok) {
  const message = `Error: ${result.status}`
  throw new Error(message)
  }
  return nearestCities
  }

  const fetchWeather = async(lat,lon) => {

    const url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + 
    "&lon=" + lon + "&exclude=minutely&appid=" + config.openAPI_key + '&units=metric'
    const result = await fetch(url)
    const weatherData = await result.json()

    if (!result.ok) {
      const message = `Error: ${result.status}`
      throw new Error(message)
    }
    return weatherData

  }
  useEffect(()=> {
    getCurrentCoords();
    if(coordsFetched){
      const {latitude: lat, longitude: lon} = currentCoords;
      const promise1 = fetchWeather(lat, lon);
      const promise2 = findNearestCity(lat, lon);
      Promise.all([promise1,promise2])
      .then(values => {
        updateCard1(values[0]);
        updateLocationName(values[1][0]);
        updateStatus(true)
      })
       .catch(err => err.message)
    }

  },[currentCoords,coordsFetched,isLoaded])
  


  if (isLoaded) {
    return (
      <div className="App">

        <div className='container'>
          <SearchBar getId={getLocationId} />
          <WeatherCard card1={card1} location1={locationName} card2={card2} location2={secondLocationName} />
          <SearchHistory />
          <DaysBar />
          <HoursSlider />
          <MainDisplay />

        </div>

      </div>
    )
  }else{
    return (
      <div>
        <h1 className="App">Loading...We're getting everything ready !</h1>
      </div>
    )
  }

}

export default App;
