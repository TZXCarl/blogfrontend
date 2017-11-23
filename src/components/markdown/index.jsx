import React, {Component} from "react"
import {injectIntl, FormattedMessage} from "react-intl"

import style from "./style.scss"

import Http from "service/http"
import {getNote} from '../../actions/noteAction'
import NoteStore from '../../stores/noteStore'
import Constants from "../../service/constant"

// import ReactMarkdown from 'react-markdown'

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
        NoteStore.addListener(this.onChange)
        this.mditor = null;
    }

    componentDidMount() {
        this.mditor =  Mditor.fromTextarea(document.getElementById('editor'));
        this.mditor.on('change', this.mditorOnChange.bind(this))
        getNote({
            'userId': '59e0c5aa785548d795cb5c56',
            'noteId': '59eaf4ac83293d1799b1a25d'
        })
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
        return (
            <div className={style.editor}>
                <div className="title">
                    <input placeholder={formatMessage({id: __('UnTitlled')})} defaultValue={title} onBlur={this.handleTitleBlur}/>
                </div>
                <div className="markdown">
                    <textarea name="editor" id="editor"></textarea>
                </div>
            </div>
        )
    }
}

export default injectIntl(Markdown)