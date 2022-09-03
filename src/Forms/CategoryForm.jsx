import React from "react"

export default class CategoryForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: '9'}
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({value: event.target.value})
        this.props.getFormCategory(prevState => ({value: this.state.value}))
    }   

    render() {
        return (
            <form>
                <h2>Choose category:</h2>
                <select value={this.state.value} onChange={this.handleChange}>
                    <option value="9">General</option>
                    <option value="10">Movies</option>
                    <option value="12">Music</option>
                    <option value="15">Video Games</option>
                    <option value="17">Science</option>
                </select>
          </form>
        )
    }
}