import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fillSingleCell,
  fillMultipleCells,
  startMultiFillingMode,
  endMultiFillingMode
} from '../reducers/editor';
import Grid from '../components/Grid';

class EditorContainer extends Component {
  constructor(props) {
    super(props);

    this.handleFillSingleCell= this.handleFillSingleCell.bind(this);
    this.handleFillMultipleCells = this.handleFillMultipleCells.bind(this);
  }

  componentWillMount() {
    this.setState({ loading: false });
  }

  handleFillSingleCell(event) {
    this.props.fillSingleCell(event.target.dataset.row, event.target.dataset.col);
  }

  handleFillMultipleCells(event) {
    this.props.fillMultipleCells(event.target.dataset.row, event.target.dataset.col);
  }

  render() {
    return (
      <Grid
        html2canvasIgnore={this.props.html2canvasIgnore}
        zoom={this.props.zoom}
        gridHeader={this.props.gridHeader}
        grid={this.props.grid}
        fillSingleCell={this.handleFillSingleCell}
        fillMultipleCells={this.handleFillMultipleCells}
        mode={this.props.mode}
        startMultiFillingMode={this.props.startMultiFillingMode}
        endMultiFillingMode={this.props.endMultiFillingMode}
      />
    );
  }
}

EditorContainer.propTypes = {
  mode: PropTypes.object.isRequired,
  startMultiFillingMode: PropTypes.func.isRequired,
  endMultiFillingMode: PropTypes.func.isRequired,
  fillSingleCell: PropTypes.func.isRequired,
  fillMultipleCells: PropTypes.func.isRequired,
  grid: PropTypes.array.isRequired,
  zoom: PropTypes.number.isRequired,
  gridHeader: PropTypes.array.isRequired,
  html2canvasIgnore: PropTypes.bool.isRequired
}

const mapDispatchToProps = {
  fillSingleCell,
  fillMultipleCells,
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
