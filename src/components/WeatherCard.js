import React from "react"

function WeatherCard(props) {
   const data = props.content
   const current = data.current
   console.log(current)

   return (
      <div className="cardContainer">
      <div className='weatherCard'>
         <h2 className='location'>Fukuoka</h2>
         <p className='status'>{current.weather[0].description}</p>
         <h1 className='temp'>19</h1>
      </div>
      <div className='weatherCard'>
         <h2 className='location'>Fukuoka</h2>
         <p className='status'>Rain</p>
         <h1 className='temp'>19</h1>
      </div>

      </div>
      
   )
}




export default WeatherCard