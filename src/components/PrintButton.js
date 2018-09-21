import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

class PrintButton extends Component {
  printDoc() {
    const input = document.getElementById('print-drawing');

    html2canvas(input, { scale: 0.9, backgroundColor: '#fff' })
      .then((canvas) => {
        var ctx = canvas.getContext('2d');

        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;

        const imgData = canvas.toDataURL('image/jpeg', 1);

        const pdf = new jsPDF('portrait', 'mm', 'A4');

        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save('download.pdf');
      });
  }

  render() {
    return (
      <a
        className="is-info button is-small"
        onClick={() => this.printDoc()}
      >
        <span>Drukuj</span>
        <span className="icon is-small">
          <i className="fas fa-print" />
        </span>
      </a>
    );
  }
}

PrintButton.contextTypes = {
  store: PropTypes.object.isRequired
};

export default PrintButton;
