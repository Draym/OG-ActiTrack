import React, {Component} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onClick: PropTypes.func,
};

const defaultProps = {};

class CLink extends Component {

  render() {
    const {children, onClick} = this.props;
    return (
      <a href="#0" onClick={onClick}>{children}</a>
    );
  }
}

CLink.propTypes = propTypes;
CLink.defaultProps = defaultProps;

export default  CLink;
