import React from "react"

function WeatherCard(props) {
   const current = props.card1.current
   //const card2 = props.card2.current || {}

   return (
      <div className="cardContainer">
      <div className='weatherCard' id='card1'>
         <h2 className='location'>{props.location1.name}</h2>
         <p className='status'>{current.weather[0].description}</p>
         <h1 className='temp'>{current.temp}º</h1>
      </div>
      <div className='weatherCard' id='card2'>
         <h2 className='location'>another location</h2>
         <p className='status'> no info</p>
         <h1 className='temp'>º</h1>
      </div>

      </div>
      
   )
}




export default WeatherCard