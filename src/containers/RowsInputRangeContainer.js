import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resizeRows } from '../store/actions';
import InputRange from '../components/InputRange';

class RowsInputRangeContainer extends Component {
  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnInput = this.handleOnInput.bind(this);

    this.state = { valueLabel: this.props.rows };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ valueLabel: nextProps.rows });
  }

  handleOnChange(event) {
    this.props.resizeRows(event.target.value);
  }

  handleOnInput(event) {
    this.setState({ valueLabel: parseInt(event.target.value, 10) });
  }

  render() {
    return (
      <InputRange
        id="input-range-rows"
        label="Wiersze"
        value={this.props.rows}
        handleOnChange={this.handleOnChange}
        handleOnInput={this.handleOnInput}
        valueLabel={this.state.valueLabel}
      />
    );
  }
}

RowsInputRangeContainer.propTypes = {
  resizeRows: PropTypes.func.isRequired,
  rows: PropTypes.number.isRequired,
};

const mapDispatchToProps = {
  resizeRows: resizeRows,
};

const mapStateToProps = state => ({
  rows: state.editor.rows,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RowsInputRangeContainer);
