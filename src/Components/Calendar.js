import { luminance } from 'luminance-js'
import moment from 'moment'
// TODO load all languages
import 'moment/locale/de'
import 'moment/locale/en-gb'
import 'moment/locale/es'
import 'moment/locale/fr'
import React, { Component } from 'react'
import withStyles from 'react-jss'
import Week from './Week'

const styles = {
  calendar: (props) => ({
    position: 'absolute',
    display: props.display ? 'flex' : 'none',
    flexDirection: 'column',
    background: 'white',
    width: '300px',
    fontSize: '1rem',
    fontFamily: '\'Open Sans\', sans-serif',
    textAlign: 'center',
    zIndex: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 5,
    ...props.style.calendar
  }),
  '@media screen and (max-width: 400px)': {
    calendar: {
      width: '100% !important'
    }
  },
  monthDisplay: (props) => ({
    backgroundColor: props.style.secondary ? props.style.secondary : '#d1d3d1',
    color: luminance(props.style.secondary ? props.style.secondary : '#d1d3d1') > 0.5 ? '#333' : '#fff',
    textTransform: 'capitalize',
    alignItems: 'center',
    padding: 10,
    display: 'flex',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...props.style.monthDisplay,
  }),
  monthSelected: (props) => ({
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...props.style.monthSelected,
  }),
  previous: (props) => ({
    background: 'url("data:image/svg+xml;utf8,<svg width=\'100%\' height=\'100%\' viewBox=\'0 0 13 21\' version=\'1.1\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' xml:space=\'preserve\' xmlns:serif=\'http://www.serif.com/\' style=\'fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;\'><g transform=\'matrix(1,0,0,1,-453.702,-176.702)\'><g id=\'Page-1-Copy-10\' transform=\'matrix(-3.82857e-16,-1,1,-3.82857e-16,273,647)\'><path d=\'M453,184L460,190L467,184\' style=\'fill:none;stroke:rgb(255, 255, 255);stroke-width:1.6px;\'/></g></g></svg>") no-repeat center',
    height: 18,
    width: 18,
    marginLeft: 10,
    cursor: 'pointer',
    transform: 'rotate(180deg)',
    ...props.style.previous
  }),
  next: (props) => ({
    background: 'url("data:image/svg+xml;utf8,<svg width=\'100%\' height=\'100%\' viewBox=\'0 0 13 21\' version=\'1.1\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' xml:space=\'preserve\' xmlns:serif=\'http://www.serif.com/\' style=\'fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;\'><g transform=\'matrix(1,0,0,1,-453.702,-176.702)\'><g id=\'Page-1-Copy-10\' transform=\'matrix(-3.82857e-16,-1,1,-3.82857e-16,273,647)\'><path d=\'M453,184L460,190L467,184\' style=\'fill:none;stroke:rgb(255, 255, 255);stroke-width:1.6px;\'/></g></g></svg>") no-repeat center',
    height: 18,
    width: 18,
    marginRight: 10,
    cursor: 'pointer',
    ...props.style.next
  }),
  weekDays: (props) => ({
    display: 'flex',
    ...props.style.weekDays,
  }),
  weekDay: (props) => ({
    fontWeight: 600,
    padding: 3,
    textAlign: 'center',
    textTransform: 'uppercase',
    width: '100%',
    ...props.style.weekDay,
  }),
  todayButton: (props) => ({
    backgroundColor: props.style.secondary ? props.style.secondary : '#d1d3d1',
    color: luminance(props.style.secondary ? props.style.secondary : '#d1d3d1') > 0.5 ? '#333' : '#fff',
    cursor: 'pointer',
    padding: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    ...props.style.todayButton,
  }),
}

class Calendar extends Component {
  state = {
    days: null,
    month: null,
    selected: null
  }

  changeMonth = (sens = 'next') => {
    const { month } = this.state

    this.setState({
      month: sens === 'next' ? month.add(1, 'month') : month.subtract(1, 'month'),
    })
  }

  selectDay = (day, today = false) => {
    const { changeInputDate } = this.props
    if (today) {
      // We set time at 00:00:00 for compare with others days
      day.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      this.setState({ selected: day, month: day.clone() }, () => changeInputDate(day))
    } else {
      this.setState({ selected: day.date, month: day.date.clone() }, () => changeInputDate(day.date))
    }
  }

  renderMonthLabel = () => {
    const { classes } = this.props
    const month = this.state.month

    const monthToDisplay = month.format('MMMM YYYY')
    return <span className={ classes.monthSelected }>{ monthToDisplay }</span>
  }

  renderWeeks = () => {
    const { style } = this.props
    const weeks = []
    let done = false
    let date = this.state.month.clone().startOf('month').add('w' - 1).day(moment().startOf('week').format('dddd'))
    let count = 0
    let monthIndex = date.month()

    while (!done) {
      weeks.push(
        <Week key={ date }
          date={ date.clone() }
          selectDay={ (day) => this.selectDay(day) }
          selectedMonth={ this.state.month }
          selected={ this.state.selected }
          style={ style }
        />
      )

      date.add(1, 'w')

      done = count++ > 2 && monthIndex !== date.month()
      monthIndex = date.month()
    }

    return weeks
  }

  componentWillMount() {
    const { dateSelected, lang } = this.props
    moment.locale(lang)

    const days = []
    const daysToMove = []
    let findFirstDay = false

    // Order days in week
    moment.weekdays().map((day, index) => {
      if ((index === 0 || day !== moment().startOf('week').format('dddd')) && !findFirstDay) {
        daysToMove.push(day)
      } else {
        findFirstDay = true
        days.push(day)
      }
    })

    this.setState({
      days: days.concat(daysToMove),
      month: moment(),
      selected: dateSelected ? dateSelected : moment().startOf('day'),
    })
  }

  render() {
    const { classes, todayTxt } = this.props

    return (
      <section className={ classes.calendar }>
        <header className={ classes.header }>
          <div className={ classes.monthDisplay }>
            <span className={ classes.previous } onClick={ () => this.changeMonth('previous') }/>
            { this.renderMonthLabel() }
            <span className={ classes.next } onClick={ () => this.changeMonth() }/>
          </div>
          <div className={ classes.weekDays }>
            { this.state.days.map(day => {
              return <span key={ day } className={ classes.weekDay }>{ day.charAt(0) }</span>
            }) }
          </div>
        </header>
        { this.renderWeeks() }
        <footer className={ classes.todayButton } onClick={ () => this.selectDay(moment(), true) }>
          { todayTxt }
        </footer>
      </section>
    )
  }
}

export default withStyles(styles)(Calendar)
