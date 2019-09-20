import React from 'react';
import {Row, Col} from "reactstrap/es";
import CComponent from "../CComponent";
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string
};
const defaultProps = {
  title: undefined,
  subTitle: undefined
};

class CTitle extends CComponent {
  render() {
    return (
      <Row className="ctn-title">
        <Col>
          <span className="base-title">{this.props.title}</span>
          <span className="base-subtitle text-muted">{this.props.subTitle}</span>
        </Col>
      </Row>
    )
  }
}

CTitle.defaultProps = defaultProps;
CTitle.propTypes = propTypes;

export default CTitle;
