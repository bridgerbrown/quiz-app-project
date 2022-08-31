import React from "react"

export default function Start(props) { 
    return (
        <div className="StartContainer">
            <h1>Quizzical</h1>
            <h2>Some description</h2>
            <button className="StartBtn" onClick={props.handleClick}>Start quiz</button>
        </div>
    )
}