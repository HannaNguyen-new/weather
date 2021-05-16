import React from "react";

function SearchBar() {

//   const hour = new Date()
//   const seconds = Date.UTC(hour)
//   const now = new Date().toLocaleString('en-GB', { timeZone: 'UTC' }).split(",")
//   const hour = new Date().toLocaleTimeString("ja-JP").split(":")
//  // const utc = Date.UTC(year,month,date,hour-9)


  const search = (event) => {
    const geoUrl =
      "http://api.openweathermap.org/geo/1.0/direct?q=fukuoka&appid=b215978ae0b5adea831c87cd99ac6d51";
  
    if (event.keyCode === 13) {
      fetch(geoUrl)
        .then((res) => res.json())
        .then((res) => {
          const { lat, lon } = res[0];
          return "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely&appid=b215978ae0b5adea831c87cd99ac6d51"
        })
        .then(url => {
          fetch(url)
          .then(res => console.log(res.json()))
        })
    }
  };

  return (
    <input className="searchBar" autoFocus={true} onKeyUp={search}></input>
  );
}

export default SearchBar;
