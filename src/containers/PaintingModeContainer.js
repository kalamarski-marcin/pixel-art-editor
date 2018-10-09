import React, { Component  } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  enableSingleFillingMode,
  enableMultiFillingMode
} from '../reducers/editor';
import PaintingMode from '../components/PaintingMode';

class PaintingModeContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PaintingMode
        mode={this.props.mode}
        enableSingleFillingMode={this.props.enableSingleFillingMode}
        enableMultiFillingMode={this.props.enableMultiFillingMode}
      />
    );
  }
}

PaintingModeContainer.propTypes = {
  mode: PropTypes.object.isRequired,
  enableSingleFillingMode: PropTypes.func.isRequired,
  enableMultiFillingMode: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  enableSingleFillingMode,
  enableMultiFillingMode
};

const mapStateToProps = (state) => ({
  mode: state.editor.mode
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaintingModeContainer);
