import "./App.css";
import DaysBar from "../components/DaysBar";
import HoursBar from "../components/HoursBar";
import MainDisplay from "../components/MainDisplay";
import SearchBar from "../components/SearchBar";
import SearchHistory from "../components/SearchHistory";
import WeatherCard from "../components/WeatherCard";

function App() {
  return (
    <div className="App">
      <SearchBar />
      <WeatherCard />
      <SearchHistory />
      <DaysBar/>
      <HoursBar/>
      <MainDisplay/>
    </div>
  );
}

export default App;
