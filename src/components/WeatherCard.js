import React from "react"

function WeatherCard() {
   const style = {
      maxWidth: "340px",
      maxHeight: "170px",
      color: "#FFFFFF",
      textShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      textAlign: "center",
      location:{
         fontSize: "40px",
      },
      status:{
         fontSize: "18px",
         marginBottom: "5px"
      },
      temp:{
         fontSize: "55px"
      }
   }
   return (
      <div style={style}>
         <h2 style={style.location}>Fukuoka</h2>
         <p style={style.status}>Rain</p>
         <h1 style={style.temp}>19</h1>
      </div>
   )
}




export default WeatherCard