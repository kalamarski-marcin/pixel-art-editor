import React, { Component, Fragment } from 'react';
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
    const { zoom, grid_header, grid } = this.props;

    return (
      <div style={{padding: '0 0 0 5px'}}>
        {!this.state.loading && <Grid
          zoom={zoom}
          grid_header={grid_header}
          grid={grid}
          handleFillCell={this.handleFillCell}
        />}
      </div>
    );
  }
}

EditorContainer.propTypes = {
  fillCell: PropTypes.func.isRequired,
  grid: PropTypes.array.isRequired,
  zoom: PropTypes.number.isRequired,
  grid_header: PropTypes.array.isRequired
}

const mapDispatchToProps = {
  fillCell: fillCell
};

const mapStateToProps = (state) => ({
  grid: state.editor.grid,
  zoom: state.editor.zoom,
  grid_header: state.editor.grid_header
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorContainer);
