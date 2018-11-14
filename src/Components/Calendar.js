import { luminance } from 'luminance-js'
import moment from 'moment'
import 'moment/locale/de'
import 'moment/locale/en-gb'
import 'moment/locale/es'
// TODO load all languages
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
    width: 360,
    fontSize: '1rem',
    fontFamily: '\'Open Sans\', sans-serif',
    textAlign: 'center',
    zIndex: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 5
  }),
  monthDisplay: (props) => ({
    fontSize: '1.3rem',
    backgroundColor: props.style.first,
    color: luminance(props.style.first) > 0.5 ? '#333' : '#fff',
    textTransform: 'uppercase',
    alignItems: 'center',
    padding: 10,
    display: 'flex',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  }),
  monthSelected: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  previous: {
    marginLeft: 10,
    cursor: 'pointer',
  },
  next: {
    marginRight: 10,
    cursor: 'pointer',
  },
  days: {
    display: 'flex',
  },
  day: (props) => ({
    color: props.style.first,
    padding: 3,
    textAlign: 'center',
    textTransform: 'uppercase',
    width: '100%'
  }),
  todayButton: (props) => ({
    backgroundColor: props.style.first,
    color: luminance(props.style.first) > 0.5 ? '#333' : '#fff',
    cursor: 'pointer',
    padding: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  })
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
        />,
      )

      date.add(1, 'w')

      done = count++ > 2 && monthIndex !== date.month()
      monthIndex = date.month()
    }

    return weeks
  }

  componentWillMount() {
    const { lang } = this.props
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
      selected: moment().startOf('day'),
    })
  }

  render() {
    const { classes } = this.props

    return (
      <section className={ classes.calendar }>
        <header className={ classes.header }>
          <div className={ classes.monthDisplay }>
            <span className={ classes.previous } onClick={ () => this.changeMonth('previous') }>&lt;</span>
            { this.renderMonthLabel() }
            <span className={ classes.next } onClick={ () => this.changeMonth() }>&gt;</span>
          </div>
          <div className={ classes.days }>
            { this.state.days.map(day => {
              return <span key={ day } className={ classes.day }>{ day.charAt(0) }</span>
            }) }
          </div>
        </header>
        { this.renderWeeks() }
        <footer className={ classes.todayButton } onClick={ () => this.selectDay(moment(), true) }>
          TODAY
        </footer>
      </section>
    )
  }
}

export default withStyles(styles)(Calendar)
