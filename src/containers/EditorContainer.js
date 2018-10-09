import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fillCellAction,
  startMultiFillingMode,
  endMultiFillingMode
} from '../reducers/editor';
import Grid from '../components/Grid';

class EditorContainer extends Component {
  constructor(props) {
    super(props);

    this.handleOnClick= this.handleOnClick.bind(this);
    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);
  }

  handleOnClick(event) {
    let row = event.target.dataset.row;
    let col = event.target.dataset.col;

    if (this.props.mode.fillSingleCell.enabled) {
      this.props.fillCellAction(row, col);
    } else {
      if (this.props.mode.fillMultipleCells.started) {
        this.props.endMultiFillingMode();
      } else {
        this.props.startMultiFillingMode(row, col);
      }
    }
  }

  handleOnMouseEnter(event) {
    let row = event.target.dataset.row;
    let col = event.target.dataset.col;

    if (this.props.mode.fillMultipleCells.enabled && this.props.mode.fillMultipleCells.started) {
      this.props.fillCellAction(row, col);
    }
  }

  handleOnMouseLeave() {
    if (this.props.mode.fillMultipleCells.enabled && this.props.mode.fillMultipleCells.started) {
      this.props.endMultiFillingMode();
    }
  }

  render() {
    return (
      <Grid
        html2canvasIgnore={this.props.html2canvasIgnore}
        gridHeader={this.props.gridHeader}
        grid={this.props.grid}
        mode={this.props.mode}
        onClick={this.handleOnClick}
        onMouseEnter={this.handleOnMouseEnter}
        onMouseLeave={this.handleOnMouseLeave}
      />
    );
  }
}

EditorContainer.propTypes = {
  mode: PropTypes.object.isRequired,
  startMultiFillingMode: PropTypes.func.isRequired,
  endMultiFillingMode: PropTypes.func.isRequired,
  fillCellAction: PropTypes.func.isRequired,
  grid: PropTypes.array.isRequired,
  gridHeader: PropTypes.array.isRequired,
  html2canvasIgnore: PropTypes.bool.isRequired
}

const mapDispatchToProps = {
  fillCellAction,
  startMultiFillingMode,
  endMultiFillingMode
};

const mapStateToProps = (state) => ({
  mode: state.editor.mode,
  grid: state.editor.grid,
  zoom: state.editor.zoom,
  gridHeader: state.editor.gridHeader,
  html2canvasIgnore: state.editor.html2canvasIgnore
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorContainer);
