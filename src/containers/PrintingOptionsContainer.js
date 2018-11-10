import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setHtml2canvasIgnore } from '../store/actions';
import PrintingOptions from '../components/PrintingOptions';

const PrintingOptionsContainer = props => (
  <PrintingOptions
    setHtml2canvasIgnore={props.setHtml2canvasIgnore}
    html2canvasIgnore={props.html2canvasIgnore}
  />
);

PrintingOptionsContainer.propTypes = {
  setHtml2canvasIgnore: PropTypes.func.isRequired,
  html2canvasIgnore: PropTypes.bool.isRequired,
};

const mapDispatchToProps = {
  setHtml2canvasIgnore,
};

const mapStateToProps = state => ({
  html2canvasIgnore: state.editor.html2canvasIgnore,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrintingOptionsContainer);
