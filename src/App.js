import "./scss/App.scss";
import config from "./config"
import DaysBar from "./components/DaysBar";
import HoursSlider from "./components/HoursSlider";
import MainDisplay from "./components/MainDisplay";
import SearchBar from "./components/SearchBar";
import SearchHistory from "./components/SearchHistory";
import WeatherCard from "./components/WeatherCard";
import { React, useState, useEffect} from "react";

// test
// move functions outside component so that i don't need to include them in dependencies array
// these functions do not reference any props or states





function App() {
  
  // get current time
  // const now = new Date().toLocaleString('en-GB', { timeZone: 'UTC' }).split(",")
  // const [date,month,year] = now[0].split('/')
  // let [hour] = now[1].split(':')
  // hour = hour.slice(1)
  // const utc = Date.UTC(year,month-1,date,hour)
  // const epoch = Math.floor(utc/1000) 
  
  //const [history, updateHistory] = useState([])
  const [currentCoords,updateCurrentCoords] = useState('')
  const [card1, updateCard1] = useState({location:'', weather:''})
 // const [card2, updateCard2] = useState({location:'', weather:''})
//  const [locationId, updateLocationId] = useState("")
  const [firstLoad, updateFirstLoad] = useState(false)
  
  
  
  
  // const getLocationId = (id) => {
  //   updateLocationId(id)
  // }
  
  // const getCoords = useCallback(
  //   async() => {
  //     const url = 'https://lookup.search.hereapi.com/v1/lookup?apiKey=' + config.hereAPI_key + '&id=' + locationId ;
  //     const result = await fetch(url)
  //     const coords =  result.json()
  //     return coords
  //   }, [locationId]) 
    
  
    const getCurrentCoords = async() => {
       navigator.geolocation.getCurrentPosition(position => {
         updateCurrentCoords(position.coords);
       })
     }
    
    const fetchAll = async(lat,lon) => {
      const promise1 = findNearestCity(lat, lon);
      const promise2 = fetchWeather(lat, lon);
      Promise.all([promise1,promise2])
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
    console.log("i run")
    getCurrentCoords();
    if(currentCoords.length > 0){
      console.log(currentCoords)
      const {latitude: lat, longitude: lon} = currentCoords;
      fetchAll(lat,lon)
      .then(values => {
        updateCard1({location:values[0][1], weather:values[1]});
        updateFirstLoad(true)
      })
      .catch(err => err.message)
      //updateHistory(currentHistory => [...currentHistory,card1])
    }
  },[])
  
//  useEffect(() => {
//     if(locationId.length > 0) {
//      getCoords()
//       .then(result => {
//         const {lat,lng : lon} = result.position
//         fetchAll(lat,lon)
//         .then(values =>  updateCard2({location: values[0][1], weather: values[1]})
//         )
//       })
//       .catch(err => err.message)

//     }
//   },[locationId, getCoords, fetchAll])

// <SearchBar  /> getId={getLocationId}
// <WeatherCard card1={card1}  card2={card2} />
// <SearchHistory history={history}/>
// <DaysBar />
// <HoursSlider />
// <MainDisplay />

  if (firstLoad) {
    return (
      <div className="App">

        <div className='container'>
          <SearchBar  /> 
          <WeatherCard card1={card1}  />
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
