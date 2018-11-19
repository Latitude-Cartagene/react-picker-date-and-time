import React, { Component } from 'react'
import { DateCalendar, Time } from 'react-picker-date-and-time'

export default class App extends Component {
  state = {
    selectedDate: null,
    selectedHours: null,
    selectedMinutes: null
  }

  getSelectedDate = (date) => {
    this.setState({selectedDate: date})
  }

  getSelectedHours = (hours, meridiem) => {
    if (hours <= 12 && meridiem) {
      if (meridiem === "PM" ){
        hours += 12;
      }
    }
    this.setState({selectedHours: hours})
  }

  getSelectedMinutes = (minutes) => {
    this.setState({selectedMinutes: minutes})
  }

  render() {
    // TODO font style
    const style = {
      first: '#005E86',
    }

    return (
      <div className='App'>
        <DateCalendar
          lang={'fr'}
          style={style}
          systemUS={false}
          getSelectedDate={this.getSelectedDate}
        />

        <Time
          systemUS={false}
          style={style}
          getSelectedHours={this.getSelectedHours}
          getSelectedMinutes={this.getSelectedMinutes}
        />
      </div>
    )
  }
}
