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
  '@media screen and (max-width: 600px)': {
    calendar: {
      width: 'auto !important'
    }
  },
  monthDisplay: (props) => ({
    backgroundColor: props.style.secondary ? props.style.secondary : '#fff',
    color: luminance(props.style.secondary ? props.style.secondary : '#fff') > 0.5 ? '#333' : '#fff',
    textTransform: 'capitalize',
    alignItems: 'center',
    padding: 10,
    display: 'flex',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    ...props.style.monthDisplay,
  }),
  monthSelected: (props) => ({
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...props.style.monthSelected,
  }),
  previous: (props) => ({
    height: 18,
    width: 18,
    marginLeft: 10,
    cursor: 'pointer',
    transform: 'rotate(180deg)',
    ...props.style.previous
  }),
  next: (props) => ({
    height: 18,
    width: 18,
    marginRight: 10,
    cursor: 'pointer',
    ...props.style.next
  }),
  weekDays: (props) => ({
    display: 'flex',
    background: '#fafafa',
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
    backgroundColor: props.style.secondary ? props.style.secondary : '#fafafa',
    color: luminance(props.style.secondary ? props.style.secondary : '#fafafa') > 0.5 ? '#333' : '#fff',
    cursor: 'pointer',
    padding: 10,
    fontSize: '0.9em',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTop: '1px solid rgba(0, 0, 0, 0.08)',
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
    const { arrow, classes, todayTxt } = this.props

    return (
      <section className={ classes.calendar }>
        <header className={ classes.header }>
          <div className={ classes.monthDisplay }>
            <img className={ classes.previous } src={arrow} onClick={ () => this.changeMonth('previous') }/>
            { this.renderMonthLabel() }
            <img className={ classes.next } src={arrow} onClick={ () => this.changeMonth() }/>
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
