import React from "react"

export default class DifficultyForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: 'easy'}
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({value: event.target.value})
        this.props.getFormDifficulty(prevState => ({value: this.state.value}))
    }   

    render() {
        return (
            <form>
                <h2>Choose difficulty:</h2>
                <select value={this.state.value} onChange={this.handleChange}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
          </form>
        )
    }
}
