import React, {Component} from "react"

class Difficulties extends Component {
    render() {
        return (
            <form>
                <h2>Choose difficulty:</h2>
                <select 
                    value={this.props.difficulty} 
                    onChange={(e) => this.props.setDifficulty(e.target.value)}
                    id="diffSelect"
                    name="diffSelect"
                >
                    <option value="">Choose</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </form>
            )}
}

export default Difficulties