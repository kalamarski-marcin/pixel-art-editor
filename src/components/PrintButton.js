import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

class PrintButton extends Component {
  constructor(props) {
    super(props);

    this.handlePrint = this.handlePrint.bind(this);
  }

  handlePrint() {
    const input = document.getElementById('print-drawing-wrapper');

    html2canvas(input, { scale: 1, backgroundColor: '#fff' })
      .then((canvas) => {
        var ctx = canvas.getContext('2d');

        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;

        const imgData = canvas.toDataURL('image/jpeg', 1);

        const pdf = new jsPDF('landscape', 'mm', 'A4');

        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save('download.pdf');
      });
  }

  render() {
    return (
      <div>
        <a
          className="is-info button is-small"
          onClick={this.handlePrint}
        >
          <span>Drukuj</span>
          <span className="icon is-small">
            <i className="fas fa-print" />
          </span>
        </a>
      </div>
    );
  }
}

PrintButton.contextTypes = {
  store: PropTypes.object.isRequired
};

export default PrintButton;
