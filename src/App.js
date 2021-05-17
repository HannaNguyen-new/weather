import "./scss/App.scss";
import DaysBar from "./components/DaysBar";
import HoursSlider from "./components/HoursSlider";
import MainDisplay from "./components/MainDisplay";
import SearchBar from "./components/SearchBar";
import SearchHistory from "./components/SearchHistory";
import WeatherCard from "./components/WeatherCard";

function App() {

  
  
  async function firstState(){
   // const geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=fukuoka&appid=b215978ae0b5adea831c87cd99ac6d51";
    const coordinates = await fetch(geoUrl)
    .then(res => res.json())
    .then(res => res[0])
    .catch(err => console.log(err))
    
    const { lat, lon } = coordinates
    
    //const url =  "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely&appid=b215978ae0b5adea831c87cd99ac6d51"
    return await fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err))
    
  }
    const firstData = firstState();



  return (
    <div className="App">
      <div className='container'>
      <SearchBar />
      <WeatherCard data={firstData}/>
      <SearchHistory />
      <DaysBar/>
      <HoursSlider/>
      <MainDisplay/>

      </div>
    </div>
  );
}

export default App;
