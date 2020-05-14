import hexToRgba from 'hex-to-rgba';
import { luminance } from 'luminance-js';
import React, { Component } from 'react';
import withStyles from 'react-jss';
import moment from 'moment'

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
    filter: 'opacity(60%)',
    ...props.style.notInMonth
  }),
  cantSelectDay: props => ({
    textDecoration:'line-through',
    filter: 'opacity(40%)',
    ...props.style.cantSelectDay
  })
};

class Day extends Component {
  render() {
    const { classes, day, selected, selectDay, selectedMonth, minDate, maxDate } = this.props;

    const isSelected = day.date.isSame(selected);
    const isToday = day.isToday;
    const isInMonth = day.date.format('MMMM') === selectedMonth.format('MMMM');

    let canSelectDate = true
    if(minDate !== undefined && maxDate !== undefined){
      let startDate = moment(minDate)
      let endDate = moment(maxDate)
      if(day.date >= startDate && day.date <= endDate) canSelectDate = true
      else canSelectDate = false
    }
    else if(minDate !== undefined && maxDate === undefined){
      let startDate = moment(minDate)
      if(day.date >= startDate) canSelectDate = true
      else canSelectDate = false
    }
    else if(minDate === undefined && maxDate !== undefined){
      let endDate = moment(maxDate)
      if(day.date <= endDate) canSelectDate = true
      else canSelectDate = false
    }
    

    return (
      <span
        key={day.date.toString()}
        className={[
          classes.day,
          !canSelectDate
          ? classes.cantSelectDay
            : !isInMonth
            ? classes.notInMonth
            : isSelected
            ? classes.selectedDay
            : isToday && !isSelected
            ? classes.today
            : ''
        ].join(' ')}
        onClick={() => canSelectDate ? selectDay(day) : function(){}}>
        {day.number}
      </span>
    );
  }
}

export default withStyles(styles)(Day);
