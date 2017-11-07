import React, { Component} from 'react'
import Calender from '../calendar'

class Test extends Component {

  handleSelect = (date) => {
    console.log(date)
  }

  handleDisabledDate = (date) => {
    return date.format('YYYY-MM-DD') === '2017-11-06'
  }

  handleDateCellRender = (date) => {

    if (date.format('YYYY-MM-DD') === '2017-11-06') {
      return <span>Sold out</span>
    }
    return null
  }

  render() {
    return(
      <div>
        {/*<Calender*/}
            {/*dateCellRender={this.handleDateCellRender}*/}
            {/*onSelect={this.handleSelect}*/}
            {/*disabledDate={this.handleDisabledDate}*/}
        {/*/>*/}
        <input style={{"outlineOffset": '4px'}}/>
      </div>
    )
  }
}

export default Test;
