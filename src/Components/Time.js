import { luminance } from 'luminance-js'
import moment from 'moment'
import React, { Component } from 'react'
import withStyles from 'react-jss'
import Select from 'react-select'

const styles = {
  inputsHours: {
    display: 'flex',
    outline: 'none',
    border: 'none',
    padding: 3.5,
    fontSize: 14,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.4)',
    borderRadius: 5,
  },
  colon: {
    display: 'flex',
    alignItems: 'center',
    padding: [5, 0],
  },
  '@global': {
    '.basic-single-meridiem': {
      display: 'flex',
      alignItems: 'center',
    },
  },
}

class Time extends Component {
  state = {
    isClearable: true,
    isSearchable: true,
    hours: [],
    hoursValue: [],
    minutes: [],
    minutesValue: [],
    meridiem: [{ value: 'AM', label: 'AM' }, { value: 'PM', label: 'PM' }],
    meridiemValue: [],
  }

  minTwoDigits = (value) => {
    return (value < 10 ? '0' : '') + value
  }

  handleChangeHours = (hoursValue) => {
    const { getSelectedHours, systemUS } = this.props
    this.setState({ hoursValue }, () => {
      getSelectedHours(hoursValue.value, systemUS ? this.state.meridiemValue.value : null)
    })
  }

  handleChangeInput = (input) => {
    const isNum = /^\d+$/.test(input)
    if (!isNum) {
      input = input.replace(/\D/g, '')
    }
    return input
  }

  handleChangeMinutes = (minutesValue) => {
    this.setState({ minutesValue })
  }

  handleChangeMeridiem = (meridiemValue) => {
    this.setState({ meridiemValue })
  }

  componentDidMount() {
    const { getSelectedHours, getSelectedMinutes, systemUS } = this.props
    const hours = []
    const hoursValue = []
    const minutes = []
    const minutesValue = []
    const meridiemValue = this.state.meridiem.find(meridiem => meridiem.value === moment().format('A'))

    // Treatment for hours
    if (systemUS) {
      // 12 hours format time
      for (let i = 1; i <= 12; i++) {
        const value = {
          value: i,
          label: i,
        }
        hours.push(value)
        if (i === parseInt(moment().format('hh'))) {
          hoursValue.push(value)
        }
      }
    } else {
      // 24 hours format time
      for (let i = 0; i <= 23; i++) {
        const value = {
          value: this.minTwoDigits(i),
          label: this.minTwoDigits(i),
        }
        hours.push(value)
        if (i === parseInt(moment().format('HH'))) {
          hoursValue.push(value)
        }
      }
    }

    // Treatment for minutes
    for (let i = 0; i <= 59; i++) {
      const value = {
        value: this.minTwoDigits(i),
        label: this.minTwoDigits(i),
      }
      minutes.push(value)
      if (i === parseInt(moment().format('mm'))) {
        minutesValue.push(value)
      }
    }

    this.setState({ hours, hoursValue, minutes, minutesValue, meridiemValue: systemUS ? meridiemValue : null }, () => {
      getSelectedHours(this.state.hoursValue[0].value, meridiemValue.value)
      getSelectedMinutes(this.state.minutesValue[0].value)
    })
  }

  renderInput = (element) => {
    const { style } = this.props
    // TODO add props with translated
    const noResult = 'Pas de résultat.'
    const customStyles = {
      control: () => ({
        display: 'flex',
        padding: [0, 15]
      }),
      clearIndicator: () => ({
        display: 'none'
      }),
      dropdownIndicator: () => ({
        display: 'none'
      }),
      indicatorSeparator: () => ({
        display: 'none'
      }),
      menu: (provided) => ({
        ...provided,
        position: 'absolute',
        zIndex: 9,
        width: 35
      }),
      menuList: (provided) => ({
        ...provided,
        zIndex: 9,
        overflowX: 'hidden'
      }),
      option: () => ({
        paddingLeft: 5,
        '&:hover': {
          backgroundColor: style.first,
          color: luminance(style.first) > 0.5 ? '#333' : '#fff',
          cursor: 'pointer',
          width: 100
        }
      }),
      singleValue: () => ({}),
      valueContainer: (provided) => ({
        ...provided,
        padding: '2px 0px',
        marginRight: -4,
        display: 'flex',
        alignItems: 'center',
        zIndex: 9
      })
    }

    return (
      <Select
        styles={ customStyles }
        className={ 'basic-single-' + element }
        classNamePrefix={ 'select-' + element }
        name={ element }
        isClearable={ element !== 'meridiem' }
        isSearchable={ element !== 'meridiem' }
        noOptionsMessage={ () => noResult }
        onInputChange={ (input) => this.handleChangeInput(input) }
        onChange={ element === 'hours' ? this.handleChangeHours : element === 'minutes' ? this.handleChangeMinutes : this.handleChangeMeridiem }
        value={ this.state[element + 'Value'] }
        options={ this.state[element] }
      />
    )
  }

  render() {
    const { classes, systemUS } = this.props

    return (
      <div className={ classes.inputsHours }>
        { this.renderInput('hours') }<span className={classes.colon}>:</span>{ this.renderInput('minutes') }

        { systemUS && (
          this.renderInput('meridiem')
        ) }
      </div>
    )
  }
}

export default withStyles(styles)(Time)
