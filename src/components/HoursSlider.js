import React from 'react'

function HoursSlider() {
   return (
      <div  className='hoursContainer'>
         <div>
            <p>Now</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
            <p>12</p>
         </div>
         <div>
            <input className='slider' type='range' min='1' max='6'></input>
         </div>
      </div>
   )
}

export default HoursSlider
