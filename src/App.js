import "./scss/App.scss";
import DaysBar from "./components/DaysBar";
import HoursSlider from "./components/HoursSlider";
import MainDisplay from "./components/MainDisplay";
import SearchBar from "./components/SearchBar";
import SearchHistory from "./components/SearchHistory";
import WeatherCard from "./components/WeatherCard";

function App() {
  return (
    <div className="App">
      <div className='container'>
      <SearchBar />
      <WeatherCard />
      <SearchHistory />
      <DaysBar/>
      <HoursSlider/>
      <MainDisplay/>

      </div>
    </div>
  );
}

export default App;
