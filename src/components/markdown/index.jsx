import React, {Component} from "react"

import style from "./style.scss"
import Coding from "./code"
import marked from "marked"
import Preview from "./preview"
// import Highlight from "highlight"
// import pygmentizeBundled from "pygmentize-bundled"
//  var Highlight = require("highlight")
// var mditor = require("mditor");
// var parser = new mditor.Parser();

class Markdown extends Component {

    constructor(props) {
        super(props)
        // this.marked = marked
        // marked.setOptions({
        //     renderer: new marked.Renderer(),
        //     gfm: true,
        //     tables: true,
        //     breaks: false,
        //     pedantic: false,
        //     sanitize: true,
        //     smartLists: true,
        //     smartypants: false,
        //     // highlight: function (code) {
        //     //     return Highlight.highlightAuto(code).value;
        //     // }
        // });
        // mditor.split = true;
        // mditor.preivew = true
    }


    state = {
        code: '',
    }

    handleOnCoding = (val) => {
        // const markedVal = marked(val);
        const markedVal = parser.parse(val);
        this.setState({
            code: val,
            marked: val
        })
    }

    componentDidMount() {
        this.mditor =  Mditor.fromTextarea(document.getElementById('editor'));
        // mditor.value = '** hello **';
    }

    render() {
        return (
            <div className={style.editor}>
                {/*<div className={style.leftContent}>*/}
                    {/*<Coding onChange={this.handleOnCoding.bind(this)}/>*/}
                {/*</div>*/}
                {/*<div className={style.rightContent}>*/}
                    {/*<Preview precode={this.state.marked}/>*/}
                {/*</div>*/}
                <textarea name="editor" id="editor"></textarea>
            </div>
        )
    }
}

export default Markdown