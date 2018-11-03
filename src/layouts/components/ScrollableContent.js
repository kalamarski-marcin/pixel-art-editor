import React from 'react';
import PropTypes from 'prop-types';

const ScrollableContent = props => (
  <div className="scrollable-content">
    {props.children}
  </div>
);

ScrollableContent.propTypes = {
  children: PropTypes.object.isRequired,
};

export default ScrollableContent;
