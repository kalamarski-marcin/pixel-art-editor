import React from 'react';
import PropTypes from 'prop-types';

const EditorSidebarSectionWrapper = (props) => (
  <div className="sidebar__section-wrapper">
    {props.children}
  </div>
);

EditorSidebarSectionWrapper.propTypes = {
  children: PropTypes.object.isRequired
}

export default EditorSidebarSectionWrapper;
