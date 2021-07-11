import { React, useState } from "react";
import Suggestion from "./Suggestion"
import {Client} from "@googlemaps/google-maps-services-js";

function SearchBar(props) {
  const [input, updateInput] = useState("");
  const [suggestion, updateSuggestion] = useState("")
  // const url = "https://maps.googleapis.com/maps/api/place/queryautocomplete/json";
  // const url = "https://autocomplete.search.hereapi.com/v1/autocomplete";

  

  const search = (event) => {
    const client = new Client({});
    const { value } = event.target;
    if (value.length > 1) {
      updateInput(value)
      client
      .elevation({
        params:{'input': input}
      })
      .then(res => {
          console.log(res.data.results[0].elevation)
          //updateSuggestion(arr);
        })
      .catch(e => console.log(e.response.data.error_message))
    }
    updateSuggestion("")
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
