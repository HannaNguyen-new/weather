import "./scss/App.scss";
import config from "./config"
import DaysBar from "./components/DaysBar";
import HoursSlider from "./components/HoursSlider";
import MainDisplay from "./components/MainDisplay";
import SearchBar from "./components/SearchBar";
import SearchHistory from "./components/SearchHistory";
import WeatherCard from "./components/WeatherCard";
import { React, useState, useEffect} from "react";

const google = window.google
const geoCoderService = new google.maps.Geocoder();
// move functions outside component so that i don't need to include them in dependencies array
// these functions do not reference any props or states

const fetchAll = async(lat,lon) => {
  const promise1 = findNearestCity(lat, lon);
  const promise2 = fetchWeather(lat, lon);
  return Promise.all([promise1,promise2])
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

function App() {
  
  // get current time
  // const now = new Date().toLocaleString('en-GB', { timeZone: 'UTC' }).split(",")
  // const [date,month,year] = now[0].split('/')
  // let [hour] = now[1].split(':')
  // hour = hour.slice(1)
  // const utc = Date.UTC(year,month-1,date,hour)
  // const epoch = Math.floor(utc/1000) 
  
  const [currentCoords, setCurrentCoords] = useState({})
  const [card1, setCard1] = useState({location:'', weather:''})
  const [card2, setCard2] = useState({location:'', weather:''})
  const [firstLoad, setFirstLoad] = useState(false)
  //const [history, setHistory] = useState([])
  
  // const createHistory = (chosenCard) => {
  //   let history = []
  //   const {location, weather} = chosenCard
  //   const {lat,lon} = weather
  //   if(history.length < 1){
  //     history.push({'location': location, 'position': {lat, lon}})
  //   }else{
  //     for(let card in history){
  //       if(chosenCard.location !== card.location){
  //         history.push({'location': location, 'position': {lat, lon}})
  //       }
  //     }
  //   }
  //   return history
  // }
  


  useEffect(()=> {
    navigator.permissions.query({name:'geolocation'}).then(result => {
      if(result.state === 'granted'){
        navigator.geolocation.watchPosition(position => setCurrentCoords(position.coords))
      }
    })

    // without this condition, fetchAll will run with undefined lat & lon => lead to error 
    // with this condition, when currentCoords is updated => useEffect run again => fetchAll fetched all data back and firstLoad is true, render is run!
    if(currentCoords.latitude){  
      const {latitude: lat, longitude: lon} = currentCoords;
      fetchAll(lat,lon)
      .then(values => {
        setCard1(prevState => Object.assign(prevState,{location:values[0][0]["name"], weather:values[1]}));
        setFirstLoad(true)
        //setHistory(createHistory(card1))
      })
      .catch(err => err.message)
      
    }
  },[currentCoords, firstLoad])
  
  
  const getId = (id) => {
    const request = {
      placeId: id
    };
    
    function callback(result, status) {
      if (status ===  "OK") {
        const place = result[0];
        const {geometry} = place;
        const lat = geometry.location.lat()
        const lon = geometry.location.lng()
        fetchAll(lat,lon)
        .then(values => {
          setCard2(prevState => Object.assign(prevState,{location:values[0][0]["name"], weather:values[1]}));
          //setHistory(createHistory(card1))
          console.log(card2)
        })
        
    }
  }
  geoCoderService.geocode(request, callback);
}
    return (
      <div className="App">
        {firstLoad ? (
            <div className='container'>
              <SearchBar passId = {getId}  /> 
              <WeatherCard cards = {[card1, card2]} />
              <SearchHistory />
              <DaysBar />
              <HoursSlider />
              <MainDisplay />
            </div>
        ) : (
          <h1 className="App">Loading...We're getting everything ready !</h1>
        )
        }
       </div>
    ) 
      }

export default App

// reverse geocode using goole API
// const findNearestCityTest = (lat,lon) => {
//   const LatLng = new google.maps.LatLng(lat,lon)
//   const request = {location : LatLng}
//   function callback(result, status) {
//     if(status === "OK"){
//       console.log(result)
//     }
//   }
//   geoCoderService.geocode(request, callback)
// }