import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {resizeCols} from '../reducers/editor';
import InputRange from '../components/InputRange';

class ColumnsInputRangeContainer extends Component {
  constructor (props){
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event){
    this.props.resizeCols(event.target.value);
  }

  render() {
    return (
      <InputRange
        id="input-range-cols"
        label="Kolumny"
        value={this.props.cols}
        handleOnChange={this.handleOnChange}
      />
    )
  }
}

ColumnsInputRangeContainer.propTypes = {
  resizeCols: PropTypes.func,
  cols: PropTypes.number
}

const mapDispatchToProps = {
  resizeCols: resizeCols
};

const mapStateToProps = (state) => ({
  cols: state.editor.cols
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnsInputRangeContainer);
