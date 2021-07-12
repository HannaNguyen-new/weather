import { React, useState } from "react";
import Suggestion from "./Suggestion"

function SearchBar(props) {
  const [input, updateInput] = useState("");
  const [suggestion, updateSuggestion] = useState("")
  // const url = "https://maps.googleapis.com/maps/api/place/queryautocomplete/json";
  // const url = "https://autocomplete.search.hereapi.com/v1/autocomplete";
  const google = window.google
  const service = new google.maps.places.AutocompleteService()
  const displaySuggestions = (predictions, status) => {
    if(status !== google.maps.places.PlacesServiceStatus.OK || !predictions){
      alert(status);
      return;
    }
    updateSuggestion(predictions)
    console.log(predictions)
  }
  

  const search = (event) => {
    const value = event.target.value;
    if (value.length > 0) {
      updateInput(value)
      service.getQueryPredictions({"input" : input}, displaySuggestions)
    }
  };
  // const search = (event) => {
  //   const { value } = event.target;
  //   updateInput(value)
  //   if (value.length > 1) {
  //     const params = '?' +
  //       'q=' + encodeURIComponent(value) +
  //       '&maxresults=10' +
  //       '&apikey=' + config.hereAPI_key
  //     fetch(url + params)
  //       .then(res => res.json())
  //       .then(res => {
  //         const arr = res.items;
  //         updateSuggestion(arr);
  //       })
  //   }
  //   updateSuggestion("")
  // };

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
