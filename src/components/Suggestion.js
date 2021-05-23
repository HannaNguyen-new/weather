import React from 'react';


export default function Suggestion(props) {
    return (
        <div className='suggestion'>
            {props.content.map(location=> {
               return <div key={location.id}>{location.title}</div>
            })}
        </div>
    )
}
