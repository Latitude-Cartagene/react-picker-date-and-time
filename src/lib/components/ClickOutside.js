import React, { Component } from 'react';

/**
 * Component that alerts if you click outside of it
 */
export default class OutsideAlerter extends Component {
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.clickOutside();
    }
  };

  render() {
    return (
      <div className={'click-outside'} ref={this.setWrapperRef}>
        {this.props.children}
      </div>
    );
  }
}
