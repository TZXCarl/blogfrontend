import React, {Component} from "react"
import {injectIntl, FormattedMessage} from "react-intl"

import style from "./style.scss"

import Http from "service/http"
import {getNote} from '../../actions/noteAction'
import NoteStore from '../../stores/noteStore'
import Constants from "../../service/constant"
// import ReactMarkdown from 'react-markdown'

import Marked from 'marked'

const TIME_OUT = 400
class Markdown extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        title:'',
        content: ''
    }

    componentWillUnmount() {
        // NoteStore.addListener(this.onChange)
        // this.mditor = null;
    }

    componentDidMount() {

    }

    // 时间间隔为TIME_OUT没有变化后再更新
    mditorOnChange = () => {
        this.timeout && clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
            this.setState({
                content: this.mditor.value
            }, TIME_OUT)
        })

    }

    onChange = () => {
        const lastAction = NoteStore.getLastAction()
        if (lastAction.status !== Constants.FETCH_SUCCESS) return
        switch (lastAction.type) {
            case Constants.GET_NOTE:
                const note = NoteStore.getCurrentNote()

                this.setState({
                    title: note.title,
                    content: note.content

                })
            break;

        }
    }

    handleGetNote = () => {


    }

    handleOnSave = () => {
        const param = {
            title: this.state.title,
            content: this.mditor.value
        }
        Http.createNote(param).then((data) => {
            console.log(data)
        })
    }

    handleTitleBlur = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    render() {
        const {intl: {formatMessage}} = this.props;
        const {title, content} = this.state;
        const input = [
            '# Live demo\n\nChanges are automatically rendered as you type.\n\n* Follows the ',
            '[CommonMark](http://commonmark.org/) spec\n* Renders actual, "native" React DOM ',
            'elements\n* Allows you to escape or skip HTML (try toggling the checkboxes above)',
            '\n* If you escape or skip the HTML, no `dangerouslySetInnerHTML` is used! Yay!\n',
            '\n## HTML block below\n\n<blockquote>\n    This blockquote will change based ',
            'on the HTML settings above.\n</blockquote>\n\n## How about some code?\n',
            '```js\nvar React = require(\'react\');\nvar Markdown = require(\'react-markdown\');',
            '\n\nReact.render(\n    <Markdown source="# Your markdown here" />,\n    document.',
            'getElementById(\'content\')\n);\n```\n\nPretty neat, eh?\n\n', '## More info?\n\n',
            'Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)\n\n',
            '---------------\n\n',
            'A component by [VaffelNinja](http://vaffel.ninja) / Espen Hovlandsdal'
        ].join('');

        const options = {
            escapeHtml: false,
            skipHtml: false,
        }
        return (
            <div className={style.editor}>
                {/*<div className="title">*/}
                    {/*<input placeholder={formatMessage({id: __('UnTitlled')})} defaultValue={title} onBlur={this.handleTitleBlur}/>*/}
                {/*</div>*/}
                {/*<div className="markdown">*/}
                    {/*<textarea name="editor" id="editor"></textarea>*/}
                {/*</div>*/}
                {/*<ReactMarkdown className="result" source={input} {...options}  renderers={Object.assign({}, ReactMarkdown.renderers,)}/>*/}

                <iframe width="100%" height="100%" srcDoc={Marked(input)}>
                </iframe>
            </div>
        )
    }
}

export default injectIntl(Markdown)