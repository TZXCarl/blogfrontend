import React, {Component} from 'react'


class coding extends Component {

    handleTextChange = (e) => {
        const val = e.target.value
        this.props.onChange(val)
    }


    render() {
        return (
            <div style={{"height": "100%"}}>
               <textarea style={{"width": "100%", "height": "100%", "outline": "none", "padding": "10px"}}
                         onChange={this.handleTextChange}
               ></textarea>
            </div>
        )
    }
}

export default coding