import React from "react";

function SearchBar() {

/*   const now = new Date().toLocaleString('en-GB', { timeZone: 'UTC' }).split(",")
  const [date,month,year] = now[0].split('/')
  let [hour] = now[1].split(':')
  hour = hour.slice(1)
  const utc = Date.UTC(year,month-1,date,hour)
  const epoch = Math.floor(utc/1000) */


  const search = (event) => {
   
  };

  return (
    <input className="searchBar" autoFocus={true} onKeyUp={search}></input>
  );
}

export default SearchBar;
