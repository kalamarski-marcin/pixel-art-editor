import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { enableMode } from '../store/actions';
import EditorMode from '../components/EditorMode';

const EditorModeContainer = props => (
  <EditorMode { ...props } />
);

EditorModeContainer.propTypes = {
  modes: PropTypes.array.isRequired,
  enableMode: PropTypes.func.isRequired
};

const mapDispatchToProps = { enableMode };

const mapStateToProps = state => ({
  modes: state.editor.modes,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorModeContainer);
