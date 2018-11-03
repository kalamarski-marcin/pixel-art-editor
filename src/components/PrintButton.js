import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  createGridImage,
  createLegendImage,
  downloadPDF,
} from '../pdf';

class PrintButton extends Component {
  constructor(props) {
    super(props);
    this.handlePrint = this.handlePrint.bind(this);
  }

  handlePrint() {
    const { store } = this.context;
    const imageCreators = [createGridImage];

    if (store.getState().editor.html2canvasIgnore) {
      imageCreators.push(createLegendImage);
    }

    downloadPDF(imageCreators);
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
  store: PropTypes.object.isRequired,
};

export default PrintButton;
