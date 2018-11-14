import moment from "moment";
import React, { Component } from "react";
import withStyles from "react-jss";
import Calendar from "./Calendar";
import ClickOutside from "./ClickOutside";

const styles = {
  calendarInput: {
    outline: "none",
    border: "none",
    padding: 10,
    fontSize: 14,
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.4)",
    borderRadius: 5,
  },
};

class DateCalendar extends Component {
  state = {
    displayCalendar: false,
    inputDate: null,
  };

  componentWillMount() {
    const { getSelectedDate } = this.props;
    const now = moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

    this.setState({inputDate: now}, () => {
      getSelectedDate(now)
    })
  }

  changeInputDate = (date) => {
    const { getSelectedDate } = this.props;
    this.setState({ inputDate: date}, () => {
      getSelectedDate(date)
      this.toggleCalendar()
    });
  };

  toggleCalendar = (open = false) => {
    this.setState({ displayCalendar: open });
  };

  render() {
    const { classes, lang, style, systemUS } = this.props;

    return (
      <ClickOutside clickOutside={this.toggleCalendar}>
        <input
          readOnly
          className={ classes.calendarInput }
          onFocus={ () => this.toggleCalendar(true) }
          value={ systemUS ? this.state.inputDate.format("MM/DD/YYYY") : this.state.inputDate.format("DD/MM/YYYY") }
        />

        <Calendar
          changeInputDate={ this.changeInputDate }
          display={ this.state.displayCalendar }
          lang={ lang }
          style={ style }
          systemUS={ systemUS }
        />
      </ClickOutside>
    );
  }
}

export default (withStyles(styles)(DateCalendar));
