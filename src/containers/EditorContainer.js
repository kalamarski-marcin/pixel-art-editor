import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fillCell } from '../reducers/editor';
import Grid from '../components/Grid';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

  printDoc() {
    const input = document.getElementById('grid');
    html2canvas(input)
      .then((canvas) => {
        this.setState({ loading: true });

        var ctx = canvas.getContext('2d');

        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false

        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('portrait', 'mm', 'A4');

        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save('download.pdf');

        this.setState({ loading: false });
      });
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
