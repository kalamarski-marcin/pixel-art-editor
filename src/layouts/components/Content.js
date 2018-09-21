import React from 'react';
import PropTypes from 'prop-types';

const Content = (props) => (
  <div className="content">
   {props.children}
  </div>
);

Content.propTypes = {
  children: PropTypes.object.isRequired
}

export default Content;
