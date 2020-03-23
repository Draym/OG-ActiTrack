import React, {Component} from 'react';
import {
  CardFooter
} from 'reactstrap';
import TString from "../../../utils/TString";
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  errorTitle: PropTypes.string
};

const defaultProps = {
  error: undefined,
  errorTitle: 'An error occurred:'
};

class CBlocError extends Component {
  render() {
    const {error, errorTitle, className} = this.props;
    if (TString.isNull(error))
      return null;
    return (
      <CardFooter className={"border-danger card-border-full card-empty-background " + className ? className : ""}>
        <h6>{errorTitle} {error} </h6>
      </CardFooter>
    );
  }
}

CBlocError.defaultProps = defaultProps;
CBlocError.propTypes = propTypes;

export default CBlocError;
