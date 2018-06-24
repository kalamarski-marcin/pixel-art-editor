import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setActiveColor} from '../reducers/editor';
import ColorPicker from '../components/ColorPicker';

class ColorPickerContainer extends Component {
  constructor (props){
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(event) {
    this.props.setActiveColor(event.target.dataset.color);
  }

  render() {
    return (
      <ColorPicker
        colors={this.props.colors}
        handleSetActiveColor={this.handleOnClick}
        activeColor={this.props.activeColor}
      />
    )
  }
}

ColorPickerContainer.propTypes = {
  setActiveColor: PropTypes.func.isRequired,
  activeColor: PropTypes.string.isRequired,
  colors: PropTypes.array.isRequired
}

const mapDispatchToProps = {
  setActiveColor: setActiveColor
};

const mapStateToProps = (state) => ({
  colors: state.editor.colors,
  activeColor: state.editor.activeColor
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorPickerContainer);
