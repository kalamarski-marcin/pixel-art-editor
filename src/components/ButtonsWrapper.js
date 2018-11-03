import React from 'react';
import PropTypes from 'prop-types';

const ButtonsWrapper = props => (
  <div className="buttons-wrapper">
    {props.children}
  </div>
);

ButtonsWrapper.propTypes = {
  children: PropTypes.object.isRequired,
};

export default ButtonsWrapper;
