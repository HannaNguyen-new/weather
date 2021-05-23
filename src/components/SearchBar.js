import config from "../config"
import { React, useState, useEffect } from "react";
import Suggestion from "./Suggestion"

function SearchBar() {
  const [input, updateInput] = useState("");
  const [suggestion, updateSuggestion] = useState("")
  const url = "https://autocomplete.search.hereapi.com/v1/autocomplete";

 // Shall i create my own Hook to trigger render when input is empty?
  const search = (event) => {
    const { value } = event.target;
    updateInput(value)
    if (value.length > 1) {
      const params = '?' +
        'q=' + encodeURIComponent(value) +
        '&maxresults=10' +
        '&apikey=' + config.hereAPI_key
      fetch(url + params)
        .then(res => res.json())
        .then(res => {
          const arr = res.items;
          updateSuggestion(arr);
        })
    }
  };

  useEffect(() =>{
    if(input.length == 0){
      updateSuggestion("")
    }
  },[input])

  return (
    <div>
      <input className="searchBar" autoFocus={true} onChange={search} value={input}></input>

      {suggestion ? <Suggestion content={suggestion} /> : null}
    </div>
  );
}

export default SearchBar;
