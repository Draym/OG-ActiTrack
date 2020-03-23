import React, {Component} from 'react';
import {Col, Row} from "reactstrap/es";
import PropTypes from 'prop-types';

const propTypes = {
  col: PropTypes.number,
  className: PropTypes.string
};

const defaultProps = {
  col: 12,
  className: ""
};

class COptionalCol extends Component {

  render() {
    const {col, className, children} = this.props;
    if (col) {
      return (
        <Row className={className}>
          <Col md={col}>
            {children}
          </Col>
        </Row>
      );
    } else {
      return React.cloneElement(children, {className: className});
    }
  }
}

COptionalCol.defaultProps = defaultProps;
COptionalCol.propTypes = propTypes;

export default COptionalCol;
