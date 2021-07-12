import { React, useState } from "react";

function SearchBar(props) {
  const {passId} = props
  const [input, updateInput] = useState("");
  const [suggestion, updateSuggestion] = useState([])
  const google = window.google
  const service = new google.maps.places.AutocompleteService()
  const displaySuggestions = (predictions, status) => {
    if(status !== google.maps.places.PlacesServiceStatus.OK || !predictions){
      console.log(status);
      return;
    }
    updateSuggestion(predictions)
  }
  

  const search = (event) => {
    const value = event.target.value;
    if (value.length > 0) {
      updateInput(value)
      service.getQueryPredictions({"input" : input}, displaySuggestions)
    }else{
      updateInput("")
      updateSuggestion([])
    }
  };

  const handleClick = event => {
    const id = event.target.id;
    passId(id)
}

  return (
    <div>
      <input className="searchBar" autoFocus={true} onChange={search} value={input}></input>
     
        <div className='suggestion'>
              {suggestion.map(location=> {
                 return <div key={location.place_id} id={location.place_id} onClick={handleClick}>{location.description}</div>
              })}
        </div>

      
    </div>
  );
}

export default SearchBar;
