import { luminance } from 'luminance-js';
import moment from 'moment';
import React, { Component } from 'react';
import withStyles from 'react-jss';
import Select from 'react-select/dist/react-select.cjs';

const styles = {
  inputsHours: props => ({
    display: 'flex',
    outline: 'none',
    padding: '0 10px',
    fontSize: 14,
    borderRadius: 5,
    alignItems: 'center',
    ...props.style.inputsHours
  }),
  colon: props => ({
    display: 'flex',
    alignItems: 'center',
    paddingRight: '5px',
    ...props.style.colon
  }),
  timeButtonImage: props => ({
    width: 25,
    ...props.style.timeButtonImage
  }),
  '@global': props => ({
    '.basic-single-meridiem': {
      display: 'flex',
      alignItems: 'center'
    },
    ...props.style.global
  })
};

class Time extends Component {
  state = {
    isClearable: true,
    isSearchable: true,
    hours: [],
    hoursValue: [],
    minutes: [],
    minutesValue: [],
    meridiem: [{ value: 'AM', label: 'AM' }, { value: 'PM', label: 'PM' }],
    meridiemValue: []
  };

  minTwoDigits = value => {
    return (value < 10 ? '0' : '') + value;
  };

  handleChangeHours = hoursValue => {
    const { getSelectedHours, systemUS } = this.props;
    this.setState({ hoursValue }, () => {
      getSelectedHours(hoursValue.value, systemUS ? this.state.meridiemValue.value : null);
    });
  };

  handleChangeMinutes = minutesValue => {
    const { getSelectedMinutes } = this.props;
    this.setState({ minutesValue }, () => {
      getSelectedMinutes(minutesValue.value);
    });
  };

  handleChangeMeridiem = meridiemValue => {
    this.setState({ meridiemValue });
  };

  componentDidMount() {
    const { getSelectedHours, getSelectedMinutes, systemUS } = this.props;
    const hours = [];
    const hoursValue = [];
    const minutes = [];
    const minutesValue = [];
    const meridiemValue = this.state.meridiem.find(meridiem => meridiem.value === moment().format('A'));

    // Treatment for hours
    if (systemUS) {
      // 12 hours format time
      for (let i = 1; i <= 12; i++) {
        const value = {
          value: i,
          label: i
        };
        hours.push(value);
        if (i === parseInt(moment().format('hh'))) {
          hoursValue.push(value);
        }
      }
    } else {
      // 24 hours format time
      for (let i = 0; i <= 23; i++) {
        const value = {
          value: this.minTwoDigits(i),
          label: this.minTwoDigits(i)
        };
        hours.push(value);
        if (i === parseInt(moment().format('HH'))) {
          hoursValue.push(value);
        }
      }
    }

    // Treatment for minutes
    for (let i = 0; i <= 59; i++) {
      const value = {
        value: this.minTwoDigits(i),
        label: this.minTwoDigits(i)
      };
      minutes.push(value);
      if (i === parseInt(moment().format('mm'))) {
        minutesValue.push(value);
      }
    }

    this.setState({ hours, hoursValue, minutes, minutesValue, meridiemValue: systemUS ? meridiemValue : null }, () => {
      getSelectedHours(this.state.hoursValue[0].value, meridiemValue.value);
      getSelectedMinutes(this.state.minutesValue[0].value);
    });
  }

  renderInput = element => {
    const { style, isMobile } = this.props;
    // TODO add props with translated
    const noResult = 'Pas de résultat.';
    const customStyles = {
      clearIndicator: provided => ({
        ...provided,
        display: 'none',
        ...style.clearIndicator
      }),
      container: provided => ({
        ...provided,
        ...style.container
      }),
      control: provided => ({
        ...provided,
        display: 'flex',
        border: 'none',
        backgroundColor: 'none',
        borderRadius: 'none',
        borderStyle: 'none',
        borderWidth: 'none',
        ...style.control
      }),
      dropdownIndicator: provided => ({
        ...provided,
        display: 'none',
        ...style.dropdownIndicator
      }),
      group: provided => ({
        ...provided,
        ...style.group
      }),
      groupHeading: provided => ({
        ...provided,
        ...style.groupHeading
      }),
      indicatorsContainer: provided => ({
        ...provided,
        ...style.indicatorsContainer
      }),
      indicatorSeparator: provided => ({
        ...provided,
        display: 'none',
        ...style.indicatorSeparator
      }),
      input: provided => ({
        ...provided,
        ...style.input
      }),
      loadingIndicator: provided => ({
        ...provided,
        ...style.loadingIndicator
      }),
      loadingMessage: provided => ({
        ...provided,
        ...style.loadingMessage
      }),
      menu: provided => ({
        ...provided,
        top: isMobile ? provided.top : 'initial',
        position: isMobile ? 'absolute' : 'fixed',
        width: 'auto',
        ...style.menu
      }),
      menuList: provided => ({
        ...provided,
        overflowX: 'hidden',
        ...style.menuList
      }),
      multiValue: provided => ({
        ...provided,
        ...style.multiValue
      }),
      multiValueLabel: provided => ({
        ...provided,
        ...style.multiValueLabel
      }),
      multiValueRemove: provided => ({
        ...provided,
        ...style.multiValueRemove
      }),
      noOptionsMessage: provided => ({
        ...provided,
        ...style.noOptionsMessage
      }),
      option: provided => ({
        ...provided,
        '&:hover': {
          backgroundColor: style.first,
          color: luminance(style.first) > 0.5 ? '#333' : '#fff',
          cursor: 'pointer'
        },
        ...style.option
      }),
      placeholder: provided => ({
        ...provided,
        ...style.placeholder
      }),
      singleValue: () => ({
        ...style.singleValue
      }),
      valueContainer: provided => ({
        ...provided,
        display: 'flex',
        alignItems: 'center',
        ...style.valueContainer
      })
    };

    return (
      <Select
        menuPlacement={isMobile ? 'top' : 'auto'}
        styles={customStyles}
        className={'basic-single-' + element}
        classNamePrefix={'select-' + element}
        name={element}
        isClearable={false}
        isSearchable={false}
        noOptionsMessage={() => noResult}
        onChange={
          element === 'hours'
            ? this.handleChangeHours
            : element === 'minutes'
            ? this.handleChangeMinutes
            : this.handleChangeMeridiem
        }
        value={this.state[element + 'Value']}
        options={this.state[element]}
      />
    );
  };

  render() {
    const { classes, image, systemUS } = this.props;
    return (
      <div className={classes.inputsHours}>
        <img src={image} className={classes.timeButtonImage} alt="time" />
        {this.renderInput('hours')}
        <span className={classes.colon}>:</span>
        {this.renderInput('minutes')}

        {systemUS && this.renderInput('meridiem')}
      </div>
    );
  }
}

export default withStyles(styles)(Time);
