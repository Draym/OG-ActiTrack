import {Component} from 'react';
import TObject from "../../utils/TObject";

class CComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.initState = this.initState.bind(this);
  }

  initState(state) {
    this.state = TObject.merge(this.state, state);
  }

  changeDisabled() {
    return false;
  }
}

export default CComponent;
