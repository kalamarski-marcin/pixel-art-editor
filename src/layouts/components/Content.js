import React from 'react';
import PropTypes from 'prop-types';

const Content = (props) => (
  <div className="fill-area fill-area-content flexbox-item-grow">
    {props.children}
  </div>
);

Content.propTypes = {
  children: PropTypes.object
}

export default Content;
