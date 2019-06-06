import React, {Component} from 'react';
import {
  CardFooter
} from 'reactstrap';
import TString from "../../../Utils/TString";

class CBlocError extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let renderError = function (error) {
      if (!TString.isNull(error)) {
        return (
          <CardFooter className="border-danger card-border-full card-empty-background">
            <h6>An error occurred: {error} </h6>
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
        {renderError(this.props.error)}
      </div>
    );
  }
}

export default CBlocError;
