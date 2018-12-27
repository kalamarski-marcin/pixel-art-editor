import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fillAreaAction,
  fillCellAction,
  startMode,
  endMode,
  runMode
} from '../store/actions';
import Grid from '../components/Grid';
import { getEnabledMode } from '../utils';

class EditorContainer extends Component {
  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);
  }

  handleOnClick(event) {
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;

    const enabledMode = getEnabledMode(this.props.modes);

    if (enabledMode.name === 'fillSingleCell') {
      this.props.runMode(row, col);
    }

    if (enabledMode.name === 'fillMultipleCells') {
      if (enabledMode.started) {
        this.props.endMode('fillMultipleCells');
      } else {
        this.props.startMode(row, col, 'fillMultipleCells');
      }
    }

    if (enabledMode.name === 'fillArea') {
      this.props.runMode(row, col);
    }

    if (enabledMode.name === 'erase') {
      if (enabledMode.started) {
        this.props.endMode('erase');
      } else {
        this.props.startMode(row, col, 'erase');
      }
    }
  }

  handleOnMouseEnter(event) {
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;

    const enabledMode = getEnabledMode(this.props.modes);

    if (enabledMode.name === 'fillMultipleCells' && enabledMode.started) {
      this.props.runMode(row, col);
    }
    if (enabledMode.name === 'erase' && enabledMode.started) {
      this.props.runMode(row, col);
    }
  }

  handleOnMouseLeave() {
    const enabledMode = getEnabledMode(this.props.modes);

    if (enabledMode.name === 'fillMultipleCells' && enabledMode.started) {
      this.props.endMode();
    }
    if (enabledMode.name === 'erase' && enabledMode.started) {
      this.props.endMode();
    }
  }

  render() {
    return (
      <Grid
        cellWidth={this.props.cellWidth}
        html2canvasIgnore={this.props.html2canvasIgnore}
        gridHeader={this.props.gridHeader}
        grid={this.props.grid}
        zoom={this.props.zoom}
        modes={this.props.modes}
        onClick={this.handleOnClick}
        onMouseEnter={this.handleOnMouseEnter}
        onMouseLeave={this.handleOnMouseLeave}
      />
    );
  }
}

EditorContainer.propTypes = {
  modes: PropTypes.array.isRequired,
  runMode: PropTypes.func.isRequired,
  endMode: PropTypes.func.isRequired,
  grid: PropTypes.array.isRequired,
  gridHeader: PropTypes.array.isRequired,
  html2canvasIgnore: PropTypes.bool.isRequired,
  activeColor: PropTypes.string.isRequired,
  cellWidth: PropTypes.number.isRequired
};

const mapDispatchToProps = {
  startMode,
  endMode,
  runMode
};

const mapStateToProps = state => ({
  modes: state.editor.modes,
  grid: state.editor.grid,
  zoom: state.editor.zoom,
  gridHeader: state.editor.gridHeader,
  html2canvasIgnore: state.editor.html2canvasIgnore,
  activeColor: state.editor.activeColor,
  cellWidth: state.editor.cellWidth
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorContainer);
