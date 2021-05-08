import "./App.css";
import SearchBar from "./components/SearchBar";
import SearchHistory from "./components/SearchHistory";
import WeatherCard from "./components/WeatherCard";
function App() {
  return (
    <div className="App">
      <SearchBar />
      <WeatherCard />
      <SearchHistory />
    </div>
  );
}

export default App;
