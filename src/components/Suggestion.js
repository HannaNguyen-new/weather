import React from 'react';


export default function Suggestion(props) {

    const handleClick = event => {
        
    }

    return (
        <div className='suggestion'>
            {props.content.map(location=> {
               return <div key={location.id} onClick={handleClick}>{location.title}</div>
            })}
        </div>
    )
}
