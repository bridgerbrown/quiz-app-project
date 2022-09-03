import React from "react"

export default class Start extends React.Component { 
    
    handleCategoryChange(event) {
        this.props.categoryCallback(event.target.categorySelect.value)
        event.preventDefault()
    }   

    handleDifficultyChange(event) {
        this.props.difficultyCallback(event.target.difficultySelect.value)
        event.preventDefault()
    }   

    render() {
        return (
            <div className="StartContainer">
                <h1>Quizzical</h1>
                <h3>Test your knowledge!</h3>

                <form>
                    <h2>Choose category:</h2>
                    <select name="categorySelect" onChange={this.handleCategoryChange}>
                        <option value="9">General</option>
                        <option value="10">Movies</option>
                        <option value="12">Music</option>
                        <option value="15">Video Games</option>
                        <option value="17">Science</option>
                    </select>
                </form>
                <form>
                    <h2>Choose difficulty:</h2>
                    <select name="difficultySelect" onChange={this.handleDifficultyChange}>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </form>

                <button className="StartBtn" onClick={props.handleClick}>Start quiz</button>
                <p >Powered by the <a href="https://opentdb.com/" target="_blank">Open Trivia Database API</a>!</p>
            </div>
        )
    }
}