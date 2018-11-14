import hexToRgba from "hex-to-rgba";
import { luminance } from "luminance-js";
import React, { Component } from "react";
import withStyles from "react-jss";

const styles = {
  day: {
    flex: 1,
    fontSize: "1rem",
    padding: [5, 0],
    alignItems: "center",
    cursor: "pointer",
  },
  today: (props) => ({
    background: hexToRgba(props.style.first, 0.5),
    color: luminance(props.style.first) > 0.5 ? "#333" : "#fff",
  }),
  selectedDay: (props) => ({
    background: props.style.first,
    color: luminance(props.style.first) > 0.5 ? "#333" : "#fff",
  }),
  notInMonth: {
    filter: "opacity(50%)",
  },
};

class Day extends Component {
  render() {
    const {
      classes,
      day,
      selected,
      selectDay,
      selectedMonth,
    } = this.props;

    const isSelected = day.date.isSame(selected);
    const isToday = day.isToday;
    const isInMonth = (day.date.format("MMMM") === selectedMonth.format("MMMM"));

    return (
      <span
        key={ day.date.toString() }
        className={ [classes.day, !isInMonth ? classes.notInMonth : isSelected ? classes.selectedDay : (isToday && !isSelected) ? classes.today : ""].join(" ") }
        onClick={ () => selectDay(day) }
      >
        { day.number }
      </span>
    );
  }
}

export default withStyles(styles)(Day);