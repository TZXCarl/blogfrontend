import React, {Component} from 'react'

class preview extends Component {

    render() {
        return (
            <div style={{"height": "100%", "padding": "10px"}} dangerouslySetInnerHTML={{__html: this.props.precode}}>
            </div>
        )
    }
}

export default preview