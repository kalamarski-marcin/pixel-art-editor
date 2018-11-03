import React from 'react';
import PropTypes from 'prop-types';
import DebounceInput from 'react-debounce-input';

const InputRange = props => (
  <div className="input-wrapper">
    <label htmlFor={props.id}>{props.label}</label>
    <DebounceInput
      id={props.id}
      type="range"
      step={1}
      min={1}
      max={26}
      debounceTimeout={500}
      value={props.value}
      onChange={props.handleOnChange}
      onInput={props.handleOnInput}
    />
    <span>{props.valueLabel}</span>
  </div>
);

InputRange.propTypes = {
  value: PropTypes.number.isRequired,
  valueLabel: PropTypes.number.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handleOnInput: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default InputRange;
