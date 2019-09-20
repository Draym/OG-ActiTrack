import React, {Component} from 'react';
import {
  CardFooter
} from 'reactstrap';
import TString from "../../../utils/TString";
import PropTypes from "prop-types";

const propTypes = {
  value: PropTypes.string,
  className: PropTypes.string
};

const defaultProps = {
  value: undefined,
  className: ''
};

class CBlocSuccess extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {value, className} = this.props;
    if (TString.isNull(value))
      return null;
    return (
      <CardFooter className={"border-success card-border-full card-empty-background " + className}>
        <h6>{value}</h6>
      </CardFooter>
    );
  }
}

CBlocSuccess.defaultProps = defaultProps;
CBlocSuccess.propTypes = propTypes;

export default CBlocSuccess;
