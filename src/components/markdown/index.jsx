import React, {Component} from "react"
import {injectIntl, FormattedMessage} from "react-intl"

import style from "./style.scss"

import Http from "service/http"
import {getNote} from '../../actions/noteAction'

import ReactMarkdown from 'react-markdown'

class Markdown extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        title:'',
        content: ''
    }

    componentWillUnmount() {
        this.mditor = null;
    }

    componentDidMount() {
        // this.mditor =  Mditor.fromTextarea(document.getElementById('editor'));
        // this.mditor.on('change', this.mditorOnChange.bind(this))
        // getNote('59eaf4ac83293d1799b1a25d')
    }

    mditorOnChange = () => {
        this.setState({
            content: this.mditor.value
        })
    }

    onChange = () => {

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

    render() {
        const {intl: {formatMessage}} = this.props;
        const {title, content} = this.state;
        let input = `#### 行程时间

"根据行程的活动时长对产品进行一日游和多日游的分类。<br>
-一日游：行程持续时间在一天内的游玩类型<br>
-多日游：行程持续时间在两天及两天以上的游玩类型"<br>`
        return (
            <div className={style.editor}>
                {/*<div className={style.title}>*/}
                    {/*<input placeholder={formatMessage({id: __('UnTitlled')})} defaultValue={title}/>*/}
                {/*</div>*/}
                {/*<div>*/}
                    {/*<textarea name="editor" id="editor"></textarea>*/}
                {/*</div>*/}
                <ReactMarkdown sourcePos={true}  source={input} />
            </div>
        )
    }
}

export default injectIntl(Markdown)