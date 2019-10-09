import React from 'react';
import PropTypes from 'prop-types';
import CComponent from "../CComponent";

const propTypes = {
  step: PropTypes.number
};
const defaultProps = {
};

class CModalStep extends CComponent {
  constructor(props){
    super(props);
    if (!props.step) {
      throw new TypeError("CModalStep requires prop 'step'.");
    }
  }
  render() {
    return this.props.children;
  }
}

CModalStep.defaultProps = defaultProps;
CModalStep.propTypes = propTypes;

export default CModalStep;
