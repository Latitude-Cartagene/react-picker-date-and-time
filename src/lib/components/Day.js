import hexToRgba from 'hex-to-rgba';
import { luminance } from 'luminance-js';
import React, { Component } from 'react';
import withStyles from 'react-jss';

const styles = {
  day: props => ({
    flex: 1,
    padding: '5px 0',
    alignItems: 'center',
    cursor: 'pointer',
    ...props.style.day
  }),
  today: props => ({
    background: hexToRgba(props.style.first, 0.5),
    color: luminance(props.style.first) > 0.5 ? '#333' : '#fff',
    borderRadius: 5,
    ...props.style.today
  }),
  selectedDay: props => ({
    background: props.style.first,
    color: luminance(props.style.first) > 0.5 ? '#333' : '#fff',
    borderRadius: 5,
    ...props.style.selectedDay
  }),
  notInMonth: props => ({
    filter: 'opacity(50%)',
    ...props.style.notInMonth
  })
};

class Day extends Component {
  render() {
    const { classes, day, selected, selectDay, selectedMonth } = this.props;

    const isSelected = day.date.isSame(selected);
    const isToday = day.isToday;
    const isInMonth = day.date.format('MMMM') === selectedMonth.format('MMMM');

    return (
      <span
        key={day.date.toString()}
        className={[
          classes.day,
          !isInMonth
            ? classes.notInMonth
            : isSelected
            ? classes.selectedDay
            : isToday && !isSelected
            ? classes.today
            : ''
        ].join(' ')}
        onClick={() => selectDay(day)}>
        {day.number}
      </span>
    );
  }
}

export default withStyles(styles)(Day);
