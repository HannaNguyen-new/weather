import React from 'react'

function SearchHistory() {
   const style = {
      maxWidth: "140px",
      maxHeight: "170px",
      background: "linear-gradient(180deg, rgba(255, 255, 255, 0.46) 51.56%, rgba(255, 255, 255, 0.0322) 100%)",
      color: "#625353",
      textShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      textAlign: "center",
      fontSize: "18px",
      lineHeight: "30px",
      padding: "5px",
      searchResult: {
         color: "#C4C4C4",
         textShadow: "none"
      }
   }
   return (
      <div style={style}>
         <p>Search history</p>
         <div  style={style.searchResult}>
         <p>Ho Chi Minh</p>
         <p>Tokyo</p>
         <p>Beijing</p>
         </div>
      </div>
   )
}

export default SearchHistory

