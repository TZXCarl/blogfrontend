import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import {
  Button, DatePicker,
} from 'antd';

import style from './style.scss'

class DateChooser extends Component {
  static propTypes = {
    step: PropTypes.string,
    onChange: PropTypes.func,
    defaultValue: PropTypes.object,
  }

  state = {
    date: this.props.defaultValue || this.props.value || moment(),
  }

  handleStep = (plus) => {
    const date = this.state.date.add(plus, this.props.step || 'day')
    this.setState({
      date,
    })
    if (this.props.onChange) {
      this.props.onChange(date)
    }
  }

  handleDateChange = (date) => {
    this.setState({
      date,
    })
    if (this.props.onChange) {
      this.props.onChange(date)
    }
  }

  render() {
    return (
      <div className={style.chooser}>
        <Button shape="circle" icon="left-circle-o"
          className="mr-2"
          onClick={() => this.handleStep(-1)}
        ></Button>
        <DatePicker
          className="mx-3"
          defaultValue={this.state.date}
          allowClear={false}
          onChange={this.handleDateChange}
        />
        <Button shape="circle" icon="right-circle-o"
          className="ml-2"
          onClick={() => this.handleStep(1)}
        ></Button>
      </div>
    )
  }
}

export default DateChooser;
