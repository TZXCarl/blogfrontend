import React, { Component } from 'react'
import PropTypes from 'prop-types';;
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment'
import {
    Form,
    Input,
    Button,
    Row,
    Col,
    Alert,
    Table
} from 'antd';

import style from './style.scss'

import  DateChooser from '../dateChooser'



class Cell extends Component {
    handleSelect= (date) => {
        if (this.props.disabledDate && this.props.disabledDate(this.props.day.date)) return;
        this.props.onSelect(date);
    }

    handleDisableDate = (date) => {
        if (this.props.disabledDate) {
            return this.props.disabledDate(date);
        }
        return false;
    }

    handleDateCell = (date) => {
        if (this.props.dateCellRender ) {
            return this.props.dateCellRender(date);
        }
        return '';
    }

    render() {
        const {day} = this.props;
        return (
            <div className={`cell ${this.handleDisableDate(day.date) && 'cell-disable'}`}
                 disabled={this.handleDisableDate(day.date)}
                 onClick={() => this.handleSelect(day.date)}>
                <div className="cellName">{day.day}</div>
                <div className="cellContent">
                    {this.handleDateCell(day.date)}
                </div>
            </div>
        )
    }
}



class Calendar extends Component {
    static PropTypes = {
        dateCellRender: PropTypes.func,
        onSelect: PropTypes.func,
        disabledDate: PropTypes.func,
        onDateChange: PropTypes.func,
    }

    state = {
        date: moment(),
    }

    constructor(props) {
        super(props)
        moment.locale('en-gb');
    }

    get date() {
        return this.state.date;
    }

    get weekdays() {
        return moment.weekdaysMin(true)
    }

    get weeks() {
        const start = this.date.clone().startOf('month').startOf('week');
        const out = [];
        for (let week = 0; week < 6/* display 6 weeks */; week++) {
            const daysOfWeek = [];
            out.push([start.week(), daysOfWeek]);
            for (const _ of this.weekdays) {
                daysOfWeek.push({
                    date: start.clone(),
                    month: start.month(),
                    day: start.date(),
                    wday: start.day(),
                });
                start.add(1, 'day');
            }
        }
        return out;
    }

    handleDateChange = (date) => {
        this.setState({
            date
        })
    }

    render() {
        return (
            <div className={style.calendar}>
                <header className="header">
                    <Row type={'flex'} align={'middle'}>
                        <Col offset="8" span="8">
                            <DateChooser
                                defaultValue={this.date}
                                allowClear={false}
                                step="month"
                                onChange={this.handleDateChange}
                            />
                        </Col>
                    </Row>
                </header>
                <table className="content">
                    <thead>
                        <tr>
                            { this.weekdays.map((day, i) => <th key={i}>{day}</th>) }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.weeks.map(([week, daysOfWeek]) => <tr key={week}>
                                {
                                    daysOfWeek.map( (d, index) =>
                                        <td key={index}>
                                            <Cell day={d} {...this.props}/>
                                        </td>
                                    )
                                }
                            </tr>)
                        }
                    </tbody>
                </table>

            </div>
        )
    }

}

export default injectIntl(Form.create()(Calendar))
