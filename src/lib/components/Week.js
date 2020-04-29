import React, { Component } from 'react';
import withStyles from 'react-jss';
import Day from './Day';
import { min } from 'moment';

const styles = {
  week: props => ({
    display: 'flex',
    ...props.style.week
  })
};

class Week extends Component {
  render() {
    let days = [];
    let { date } = this.props;

    const { classes, selected, selectDay, selectedMonth, style, minDate, maxDate } = this.props;

    for (let i = 0; i < 7; i++) {
      let day = {
        number: date.date(),
        isToday: date.isSame(new Date(), 'day'),
        date: date
      };

      days.push(
        <Day
          key={day.date.toString()}
          day={day}
          selected={selected}
          selectDay={selectDay}
          selectedMonth={selectedMonth}
          style={style}
          minDate={minDate}
          maxDate={maxDate}
        />
      );

      date = date.clone();
      date.add(1, 'day');
    }

    return (
      <div className={classes.week} key={days[0]}>
        {days}
      </div>
    );
  }
}

export default withStyles(styles)(Week);
