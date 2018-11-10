import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { clearEditor } from '../store/actions';

class ClearButton extends Component {
  render() {
    const { store } = this.context;

    return (
      <a
        className="is-primary button is-small"
        onClick={() => store.dispatch(clearEditor()) }
      >
        <span>Wyczyść</span>
        <span className="icon is-small">
          <i className="fas fa-trash-alt" />
        </span>
      </a>
    );
  }
}

ClearButton.contextTypes = {
  store: PropTypes.object.isRequired,
};

export default ClearButton;
