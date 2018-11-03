import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Legend from '../components/Legend';

const LegendContainer = props => <Legend {...props} />;

LegendContainer.propTypes = {
  legend: PropTypes.object.isRequired,
  html2canvasIgnore: PropTypes.bool.isRequired,
};

const mapDispatchToProps = {};

const mapStateToProps = state => ({
  legend: state.editor.colors,
  html2canvasIgnore: state.editor.html2canvasIgnore,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LegendContainer);
