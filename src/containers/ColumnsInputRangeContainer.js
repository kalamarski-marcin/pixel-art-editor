import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {resizeCols} from '../reducers/editor';
import InputRange from '../components/InputRange';

class ColumnsInputRangeContainer extends Component {
  constructor (props){
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnInput = this.handleOnInput.bind(this);

    this.state = { valueLabel: this.props.cols }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ valueLabel: nextProps.cols })
  }

  handleOnInput (event) {
    this.setState({ valueLabel: parseInt(event.target.value, 10) })
  }

  handleOnChange (event){
    this.props.resizeCols(event.target.value);
  }

  render() {
    return (
      <InputRange
        id="input-range-cols"
        label="Kolumny"
        value={this.props.cols}
        handleOnChange={this.handleOnChange}
        handleOnInput={this.handleOnInput}
        valueLabel={this.state.valueLabel}
      />
    )
  }
}

ColumnsInputRangeContainer.propTypes = {
  resizeCols: PropTypes.func.isRequired,
  cols: PropTypes.number.isRequired
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
