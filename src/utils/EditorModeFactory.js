class EditorModeFactory {
  static build(props) {
  }
}

class StrategyMode {
  constructor(props) {
    this.props = props;
  }

  fillCell() {

  }
}

class SingleMode extends StrategyMode {

}

export default EditorModeFactory;