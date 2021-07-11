import React from "react"

function WeatherCard(props) {
   const{card1, card2} = props
if(card2){
   return (
      <div className="cardContainer">
      <div className='weatherCard' id='card1'>
         <h2 className='location'>{card1.location}</h2>
         <p className='status'>{card1.weather.current.weather[0].description}</p>
         <h1 className='temp'>{card1.weather.current.temp}º</h1>
      </div>
     
      <div className='weatherCard' id='card2'>
         <h2 className='location'>{card2.location}</h2>
         <p className='status'>{card2.weather.current.weather.description}</p>
         <h1 className='temp'>{card2.weather.current.temp}º</h1>
      </div>

      </div>
   )
}
return(
      <div className="cardContainer">
      <div className='weatherCard' id='card1'>
         <h2 className='location'>{card1.location}</h2>
         <p className='status'>{card1.weather.current.weather[0].description}</p>
         <h1 className='temp'>{card1.weather.current.temp}º</h1>
      </div>

      
      <div className='weatherCard' id='card2'>
         <h2 className='location'>Location</h2>
         <p className='status'>Info</p>
         <h1 className='temp'>º</h1>
      </div>
      </div>

)
}




export default WeatherCard