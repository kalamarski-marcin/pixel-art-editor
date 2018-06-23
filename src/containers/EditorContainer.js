import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fillCell} from '../reducers/editor';
import Grid from '../components/Grid';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

class EditorContainer extends Component {
  constructor (props){
    super(props);

    this.handleFillCell = this.handleFillCell.bind(this);
  }

  handleFillCell (event) {
    this.props.fillCell(
      event.target.dataset.row,
      event.target.dataset.col
    );
  }

  printDoc () {
    const input = document.getElementById('grid');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save('download.pdf');
      });
  }

  render() {
    const { zoom, grid_header, grid } = this.props;

    return (
      <Grid
        zoom={zoom}
        grid_header={grid_header}
        grid={grid}
        handleFillCell={this.handleFillCell}
      />
    );
  }
}

EditorContainer.propTypes = {
  fillCell: PropTypes.func,
  grid: PropTypes.array,
  zoom: PropTypes.number,
  grid_header: PropTypes.array
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
