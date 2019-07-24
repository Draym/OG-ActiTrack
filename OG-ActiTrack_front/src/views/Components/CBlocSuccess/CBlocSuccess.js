import React, {Component} from 'react';
import {
  CardFooter
} from 'reactstrap';
import TString from "../../../Utils/TString";

class CBlocSuccess extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let render = function (value) {
      if (!TString.isNull(value)) {
        return (
          <CardFooter className={"border-success card-border-full card-empty-background " + this.props.className}>
            <h6>{value}</h6>
          </CardFooter>
        );
      } else {
        return (
          null
        );
      }
    }.bind(this);
    return (
      <div>
        {render(this.props.value)}
      </div>
    );
  }
}

export default CBlocSuccess;
