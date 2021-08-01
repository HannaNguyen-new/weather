import React from "react"

function WeatherCard({cards}) {
   if(cards[1] && cards[1].location === ""){
      cards = [cards.shift()]
   }
   return (
      <>
      {cards.map(card => {
         return (
      <div className="cardContainer">
      <div className='weatherCard' id='card1'>
         <h2 className='location'>{card.location}</h2>
         <p className='status'>{card.weather.current.weather[0].description}</p>
         <h1 className='temp'>{card.weather.current.temp}º</h1>
      </div>
      </div>)
      })}

         )

      </>
      
   )
}




export default WeatherCard