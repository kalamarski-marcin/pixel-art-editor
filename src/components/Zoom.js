import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { zoomIn, zoomOut } from '../store/actions';

const Zoom = props => (
  <div className='painting-mode-wrapper'>
    <div className='painting-mode' onClick={() => props.zoomOut()}>
      <i className='fas fa-search-minus fa-2x' />
    </div>
    <div className='painting-mode' onClick={() => props.zoomIn()}>
      <i className='fas fa-search-plus fa-2x' />
    </div>
  </div>
);

Zoom.propTypes = {
  zoomIn: PropTypes.func.isRequired,
  zoomOut: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  zoom: state.editor.zoom
});

const mapDispatchToProps = {
  zoomIn,
  zoomOut
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Zoom);
