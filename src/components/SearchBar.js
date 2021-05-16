import React from "react";

function SearchBar() {

  const now = new Date().toLocaleString('en-GB', { timeZone: 'UTC' }).split(",")
  const [date,month,year] = now[0].split('/')
  let [hour] = now[1].split(':')
  hour = hour.slice(1)
  const utc = Date.UTC(year,month-1,date,hour)
  const epoch = Math.floor(utc/1000)


  const search = (event) => {
    const geoUrl =
      "http://api.openweathermap.org/geo/1.0/direct?q=fukuoka&appid=b215978ae0b5adea831c87cd99ac6d51";
  
    if (event.keyCode === 13) {
      const result = fetch(geoUrl)
        .then((res) => res.json())
        .then((res) => {
          const { lat, lon } = res[0];
          return "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely&appid=b215978ae0b5adea831c87cd99ac6d51"
        })
        .then(url => {
          return fetch(url)
          .then(res => res.json())
          .then(res => res.current)
          .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
        console.log(result)
    }
  };

  return (
    <input className="searchBar" autoFocus={true} onKeyUp={search}></input>
  );
}

export default SearchBar;
