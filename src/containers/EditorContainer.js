import React, { Component  } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fillCell } from '../reducers/editor';
import Grid from '../components/Grid';

class EditorContainer extends Component {
  constructor(props) {
    super(props);

    this.handleFillCell = this.handleFillCell.bind(this);
  }

  componentWillMount() {
    this.setState({
      loading: false
    });
  }

  handleFillCell(event) {
    this.props.fillCell(
      event.target.dataset.row,
      event.target.dataset.col
    );
  }

  render() {
    const { zoom, grid_header, grid, html2canvasIgnore } = this.props;

    return (
      <Grid
        html2canvasIgnore={html2canvasIgnore}
        zoom={zoom}
        grid_header={grid_header}
        grid={grid}
        handleFillCell={this.handleFillCell}
      />
    );
  }
}

EditorContainer.propTypes = {
  fillCell: PropTypes.func.isRequired,
  grid: PropTypes.array.isRequired,
  zoom: PropTypes.number.isRequired,
  grid_header: PropTypes.array.isRequired,
  html2canvasIgnore: PropTypes.bool.isRequired
}

const mapDispatchToProps = {
  fillCell: fillCell
};

const mapStateToProps = (state) => ({
  grid: state.editor.grid,
  zoom: state.editor.zoom,
  grid_header: state.editor.grid_header,
  html2canvasIgnore: state.editor.html2canvasIgnore
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorContainer);
