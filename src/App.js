import "./scss/App.scss";
import config from "./config"
import DaysBar from "./components/DaysBar";
import HoursSlider from "./components/HoursSlider";
import MainDisplay from "./components/MainDisplay";
import SearchBar from "./components/SearchBar";
import SearchHistory from "./components/SearchHistory";
import WeatherCard from "./components/WeatherCard";
import { React, useState, useEffect, useMemo} from "react";

// test
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
  // const [card2, updateCard2] = useState({location:'', weather:''})
  //  const [locationId, updateLocationId] = useState("")
  const [firstLoad, setFirstLoad] = useState(false)

  const createHistory = (card1) => {
    let history = []
    const {location, weather} = card1
    const {lat,lon} = weather
  if(history.length < 1){
    history.push({'location': location, 'position': {lat, lon}})
  }else{
    for(let card in history){
      if(card1.location !== card.location){
        history.push(card1)
      }
      if(card1.weather.current.temp !== card.weather.current.temp){
        card.weather = card1.weather

      }
    }
  }
  return history
}

const history = useMemo(() => card1.location? createHistory(card1):[], [card1])
console.log(history)
// console.log(createHistory(card1))

  
  // eslint-disable-next-line react-hooks/exhaustive-deps


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
      })
      .catch(err => err.message)

    }
  },[currentCoords, firstLoad])
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
