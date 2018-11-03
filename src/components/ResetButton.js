import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { resetEditor } from '../reducers/editor';

class ResetButton extends Component {
  render() {
    const { store } = this.context;

    return (
      <a
        className="is-danger button is-small is-outlined"
        onClick={() => store.dispatch(resetEditor()) }
      >
        <span>Reset</span>
        <span className="icon is-small">
          <i className="fas fa-times" />
        </span>
      </a>
    );
  }
}

ResetButton.contextTypes = {
  store: PropTypes.object.isRequired,
};

export default ResetButton;
