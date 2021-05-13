import React from 'react'

function DaysBar() {
   return (
      <div className='daysContainer'>
         <i class="fas fa-chevron-right"></i>
         <div className='day'>
            <p>Today</p>
            <p>5/8</p>
         </div>
         <div className='day'>
            <p>Tue</p>
            <p>5/9</p>

         </div>
         <div className='day'>
            <p>Wed</p>
            <p>5/9</p>

         </div>
         <div className='day'>
            <p>Thu</p>
            <p>5/10</p>

         </div>
         <div className='day'>
            <p>Fri</p>
            <p>5/11</p>
         </div>
         <div className='day'>
            <p>Sat</p>
            <p>5/12</p>
         </div>
         <div className='day'>
            <p>Sun</p>
            <p>5/12</p>
         </div>
      </div>
   )
}

export default DaysBar
