import React, { Component  } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { enablePaintBrushMode, enablePaintRollerMode } from '../reducers/editor';
import PaintingMode from '../components/PaintingMode';

class PaintingModeContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PaintingMode
        mode={this.props.mode}
        enablePaintBrushMode={this.props.enablePaintBrushMode}
        enablePaintRollerMode={this.props.enablePaintRollerMode}
      />
    );
  }
}

PaintingModeContainer.propTypes = {
  mode: PropTypes.object.isRequired,
  enablePaintBrushMode: PropTypes.func.isRequired,
  enablePaintRollerMode: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  enablePaintBrushMode,
  enablePaintRollerMode
};

const mapStateToProps = (state) => ({
  mode: state.editor.mode
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaintingModeContainer);
