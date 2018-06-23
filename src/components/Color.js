import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Color extends Component {
  constructor (props) {
    super(props);

    this.classNames = this.classNames.bind(this);
  }

  classNames (){
    return this.props.activeColor === this.props.color ?
      'editor-color-picker__color--active' :
      ''
  }

  shouldComponentUpdate (nextProps) {
    return nextProps.activeColor === nextProps.color ||
      this.props.color === this.props.activeColor
  }

  render () {
    const { color, handleSetActiveColor } = this.props;
    return (
      <div
        data-color={this.props.color}
        className={`editor-color-picker__color ${this.classNames()}`}
        onClick={handleSetActiveColor}
        style={{ backgroundColor: color }}
      />
    )
  }
}

Color.propTypes = {
  color: PropTypes.string.isRequired,
  activeColor: PropTypes.string.isRequired,
  handleSetActiveColor: PropTypes.func.isRequired
};

export default Color;
