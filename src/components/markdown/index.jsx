import React, {Component} from "react"

import style from "./style.scss"
import Coding from "./code"
import marked from "marked"
import Preview from "./preview"
// import Highlight from "highlight"
// import pygmentizeBundled from "pygmentize-bundled"
 var Highlight = require("highlight")

class Markdown extends Component {

    constructor(props) {
        super(props)
        // this.marked = marked
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false,
            highlight: function (code) {
                return Highlight.highlightAuto(code).value;
            }
        });
    }


    state = {
        code: '',
    }

    handleOnCoding = (val) => {
        const markedVal = marked('```js\\n console.log("hello"); \\n```');
        this.setState({
            code: val,
            marked: markedVal
        })
    }

    render() {
        return (
            <div id="editor" className={style.editor}>
                <div className={style.leftContent}>
                    <Coding onChange={this.handleOnCoding.bind(this)}/>
                </div>
                <div className={style.rightContent}>
                    <Preview precode={this.state.marked}/>
                </div>
            </div>
        )
    }
}

export default Markdown