import React, {Component} from "react";
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string
};

const defaultProps = {
  className: ""
};

class PremiumStar extends Component {
  render() {
    return (
      <i className={"fa fa-star " + this.props.className}  style={{color: '#ffe200'}}/>
    );
  }
}
PremiumStar.propTypes = propTypes;
PremiumStar.defaultProps = defaultProps;

export default PremiumStar;
