import moment from 'moment';
import React, { Component } from 'react';
import withStyles from 'react-jss';
import Calendar from './Calendar';
import ClickOutside from './ClickOutside';

const styles = {
  calendarButtonStyle: props => ({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: 10,
    fontSize: 14,
    borderRadius: 5,
    ...props.style.calendarButtonStyle
  }),
  calendarButtonImage: props => ({
    paddingRight: 10,
    width: 25,
    ...props.style.calendarButtonImage
  })
};

class DateCalendar extends Component {
  state = {
    displayCalendar: false,
    inputDate: null
  };

  componentWillMount() {
    const { getSelectedDate, setDate, minDate } = this.props;
    let now = moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

    if(minDate !== undefined){
      let startDate = moment(minDate).set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      if(now < startDate) now = startDate
    }

    if (setDate) {
      this.setState({ inputDate: moment(setDate) });
    } else {
      this.setState({ inputDate: now }, () => {
        getSelectedDate(now);
      });
    }
  }

  changeInputDate = date => {
    const { getSelectedDate } = this.props;
    this.setState({ inputDate: date }, () => {
      getSelectedDate(date);
      this.toggleCalendar();
    });
  };

  toggleCalendar = (open = false) => {
    this.setState({ displayCalendar: open });
  };

  render() {
    const { arrow, classes, lang, style, systemUS, image, todayTxt, minDate, maxDate } = this.props;

    const day = this.state.inputDate;
    let date = systemUS ? this.state.inputDate.format('MM/DD/YYYY') : this.state.inputDate.format('DD/MM/YYYY');
    if (day.format('DD/MM/YYYY') === moment().format('DD/MM/YYYY')) {
      date = todayTxt;
    }

    return (
      <ClickOutside clickOutside={this.toggleCalendar}>
        <div className={classes.calendarButtonStyle} onClick={() => this.toggleCalendar(true)}>
          <img src={image} className={classes.calendarButtonImage} alt="calendar" />
          {date}
        </div>

        <Calendar
          changeInputDate={this.changeInputDate}
          display={this.state.displayCalendar}
          dateSelected={this.state.inputDate}
          lang={lang}
          arrow={arrow}
          style={style}
          systemUS={systemUS}
          todayTxt={todayTxt}
          minDate={minDate}
          maxDate={maxDate}
        />
      </ClickOutside>
    );
  }
}

export default withStyles(styles)(DateCalendar);
