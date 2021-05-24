import config from "../config"
import { React, useState } from "react";
import Suggestion from "./Suggestion"

function SearchBar(props) {
  const [input, updateInput] = useState("");
  const [suggestion, updateSuggestion] = useState("")
  const url = "https://autocomplete.search.hereapi.com/v1/autocomplete";


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
    updateSuggestion("")
  };

    // pass this function as props to suggestion  
    const getChosenLocation = (id) => {
      props.getId(id)
    }

  return (
    <div>
      <input className="searchBar" autoFocus={true} onChange={search} value={input}></input>

      {suggestion ? <Suggestion content={suggestion} getData={getChosenLocation} /> : null}
    </div>
  );
}

export default SearchBar;
