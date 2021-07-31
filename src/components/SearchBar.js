import { React, useState } from "react";

function SearchBar(props) {
  const {passId} = props
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState([])
  const google = window.google
  const service = new google.maps.places.AutocompleteService()
  const displaySuggestions = (predictions, status) => {
    if(status !== "OK" || !predictions){
      return;
    }
    setSuggestion(predictions)
  }
  

  const search = (event) => {
    const {value} = event.target;
    if (value.length > 0) {
      setInput(value)
      service.getQueryPredictions({"input" : input}, displaySuggestions)
    }else{
      setInput("")
      setSuggestion([])
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
