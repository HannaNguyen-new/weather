import React from 'react';


export default function Suggestion(props) {

    const handleClick = event => {
        const id = event.target.id;
        props.getData(id)
    }

    return (
        <div className='suggestion'>
            {props.content.map(location=> {
               return <div key={location.place_id} id={location.place_id} onClick={handleClick}>{location.description}</div>
            //    return <div key={location.id} id={location.id} onClick={handleClick}>{location.title}</div>
            })}
        </div>
    )
}
