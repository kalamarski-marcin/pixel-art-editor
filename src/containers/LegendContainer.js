import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Legend from '../components/Legend';

const LegendContainer = props => <Legend legend={props.legend} />;

LegendContainer.propTypes = {
  legend: PropTypes.object.isRequired
}

const mapDispatchToProps = {};

const mapStateToProps = (state) => ({
  legend: state.editor.legend
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LegendContainer);
