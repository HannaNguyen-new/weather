import React from "react"

function WeatherCard(props) {
   const current = props.content.current


   return (
      <div className="cardContainer">
      <div className='weatherCard' id='card1'>
         <h2 className='location'>{props.location.name}</h2>
         <p className='status'>{current.weather[0].description}</p>
         <h1 className='temp'>{current.temp}º</h1>
      </div>
      <div className='weatherCard' id='card2'>
         <h2 className='location'>Fukuoka</h2>
         <p className='status'>Rain</p>
         <h1 className='temp'>19</h1>
      </div>

      </div>
      
   )
}




export default WeatherCard