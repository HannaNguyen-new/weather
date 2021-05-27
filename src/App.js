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

  const history = [];
  const [currentCoords,updateCurrentCoords] = useState('')
  //const [coordsFetched, updateFetchStatus] = useState(false)
  const [locationName, updateLocationName] = useState("")
  const [card1, updateCard1] = useState({location:'', weather:''})
  const [card2, updateCard2] = useState({location:'', weather:''})
  //const [isLoaded, updateStatus] = useState(false)
  const [locationId, updateLocationId] = useState("")
  //const [secondCoords, updateSecondCoords] = useState("")
  //const [secondCoordsFetched, updateSecondStatus] = useState("")
  //const [secondLocationName, updateSecondLocationName] = useState(false)
  //const [card2, updateCard2] = useState("")


  useEffect(() => {
    if(locationId.length > 0) {
     getCoords()
      .then(result => {
        //updateSecondCoords(result.position)
        //updateSecondStatus(true)
        const {lat,lng : lon} = result.position
        fetchAll(lat,lon)
        .then(values =>  updateCard2({location: values[0][1], weather: values[1]})
        )
         .catch(err => err.message)
      })
      .catch(err => console.log(err))

    }

    
  },[locationId])

  const getLocationId = (id) => {
    updateLocationId(id)
  }
  const getCoords = async() => {
    const url = 'https://lookup.search.hereapi.com/v1/lookup?apiKey=' + config.hereAPI_key + '&id=' + locationId ;
    const result = await fetch(url)
    const coords =  result.json()
    return coords
  
  }
  const getCurrentCoords = async() => {
    navigator.geolocation.getCurrentPosition(position => {
      updateCurrentCoords(position.coords);
      //updateFetchStatus(true)
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

  const fetchAll = async(lat,lon) => {
    const promise1 = findNearestCity(lat, lon);
    const promise2 = fetchWeather(lat, lon);
    Promise.all([promise1,promise2])
    
  }
  useEffect(()=> {
    getCurrentCoords();
    if(currentCoords){
      const {latitude: lat, longitude: lon} = currentCoords;
      fetchAll(lat,lon)
      .then(values => {
        updateCard1({location:values[0][1], weather:values[1]});
        //updateStatus(true)
      })
      .catch(err => err.message)
      history.push(card1)
    }

  },[currentCoords])
  


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
