import React from "react"
import CategoryForm from "./Forms/CategoryForm.jsx"
import DifficultyForm from "./Forms/DifficultyForm.jsx"


export default function Start(props) { 
    return (
        <div className="StartContainer">
            <h1>Quizzical</h1>
            <h3>Test your knowledge!</h3>

            <CategoryForm formCategoryProp={props.getFormCategory} />
            <DifficultyForm formDifficultyProp={props.getFormDifficulty} />

            <button className="StartBtn" onClick={props.handleClick}>Start quiz</button>
            <p >Powered by the <a href="https://opentdb.com/" target="_blank">Open Trivia Database API</a>!</p>
        </div>
    )
}