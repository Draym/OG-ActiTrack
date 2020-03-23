import PropTypes from 'prop-types';
import CComponent from "../CComponent";

const propTypes = {
  step: PropTypes.number,
  isReady: PropTypes.bool,
  isLoading: PropTypes.bool
};
const defaultProps = {
  isReady: undefined,
  isLoading: undefined
};

class CModalStep extends CComponent {
  constructor(props){
    super(props);
    if (!props.step) {
      throw new TypeError("CModalStep requires prop 'step'.");
    }
    if (props.isReady === undefined) {
      throw new TypeError("CModalStep requires prop 'isReady'.");
    }
    if (props.isLoading === undefined) {
      throw new TypeError("CModalStep requires prop 'isLoading'.");
    }
  }
  render() {
    return this.props.children;
  }
}

CModalStep.defaultProps = defaultProps;
CModalStep.propTypes = propTypes;

export default CModalStep;
