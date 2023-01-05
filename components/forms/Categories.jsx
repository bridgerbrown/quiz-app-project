import React, {Component} from "react"

class Categories extends Component {
    render() {
        return (
            <form>
                <h2>Choose category:</h2>
                <select 
                    value={this.props.category} 
                    onChange={(e) => this.props.setCategory(e.target.value)}
                    id="catSelect"
                    name="catSelect"
                >   
                    <option value="">Choose</option>
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

export default Categories