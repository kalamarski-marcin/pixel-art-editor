import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  enableSingleFillingMode,
  enableMultiFillingMode,
  enableAreaFillingMode,
  enableEraseMode,
} from '../reducers/editor';
import EditorMode from '../components/EditorMode';

const EditorModeContainer = props => (
  <EditorMode { ...props } />
);

EditorModeContainer.propTypes = {
  mode: PropTypes.object.isRequired,
  enableSingleFillingMode: PropTypes.func.isRequired,
  enableMultiFillingMode: PropTypes.func.isRequired,
  enableAreaFillingMode: PropTypes.func.isRequired,
  enableEraseMode: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  enableSingleFillingMode,
  enableMultiFillingMode,
  enableAreaFillingMode,
  enableEraseMode,
};

const mapStateToProps = state => ({
  mode: state.editor.mode,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorModeContainer);
