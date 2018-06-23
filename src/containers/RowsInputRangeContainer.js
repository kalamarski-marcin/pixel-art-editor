import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {resizeRows} from '../reducers/editor';
import InputRange from '../components/InputRange';

class RowsInputRangeContainer extends Component {
  constructor (props){
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event){
    this.props.resizeRows(event.target.value);
  }

  render() {
    return (
      <InputRange
        id="input-range-rows"
        label="Wiersze"
        value={this.props.rows}
        handleOnChange={this.handleOnChange}
      />
    )
  }
}

RowsInputRangeContainer.propTypes = {
  resizeRows: PropTypes.func,
  rows: PropTypes.number
}

const mapDispatchToProps = {
  resizeRows: resizeRows
};

const mapStateToProps = (state) => ({
  rows: state.editor.rows
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RowsInputRangeContainer);
