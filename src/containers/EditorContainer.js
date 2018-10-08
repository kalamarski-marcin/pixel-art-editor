import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  paintBrush,
  paintRoller,
  startPaintRollerMode,
  endPaintRollerMode
} from '../reducers/editor';
import Grid from '../components/Grid';

class EditorContainer extends Component {
  constructor(props) {
    super(props);

    this.handlePaintBrush = this.handlePaintBrush.bind(this);
    this.handlePaintRoller = this.handlePaintRoller.bind(this);
  }

  componentWillMount() {
    this.setState({ loading: false });
  }

  handlePaintBrush(event) {
    this.props.paintBrush(event.target.dataset.row, event.target.dataset.col);
  }

  handlePaintRoller(event) {
    this.props.paintRoller(event.target.dataset.row, event.target.dataset.col);
  }

  render() {
    return (
      <Grid
        html2canvasIgnore={this.props.html2canvasIgnore}
        zoom={this.props.zoom}
        gridHeader={this.props.gridHeader}
        grid={this.props.grid}
        paintBrush={this.handlePaintBrush}
        paintRoller={this.handlePaintRoller}
        mode={this.props.mode}
        startPaintRollerMode={this.props.startPaintRollerMode}
        endPaintRollerMode={this.props.endPaintRollerMode}
      />
    );
  }
}

EditorContainer.propTypes = {
  mode: PropTypes.object.isRequired,
  startPaintRollerMode: PropTypes.func.isRequired,
  endPaintRollerMode: PropTypes.func.isRequired,
  paintBrush: PropTypes.func.isRequired,
  paintRoller: PropTypes.func.isRequired,
  grid: PropTypes.array.isRequired,
  zoom: PropTypes.number.isRequired,
  gridHeader: PropTypes.array.isRequired,
  html2canvasIgnore: PropTypes.bool.isRequired
}

const mapDispatchToProps = {
  paintBrush,
  paintRoller,
  startPaintRollerMode,
  endPaintRollerMode
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
