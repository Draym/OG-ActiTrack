import React, {Component} from 'react';
import {Col, Row} from "reactstrap/es";
import PropTypes from 'prop-types';
import CBlockTitle from "../CBlockTitle/CBlockTitle";

const propTypes = {
  title: PropTypes.string,
  muted: PropTypes.bool,
  inline: PropTypes.bool,
  className: PropTypes.string
};

const defaultProps = {};

class COptionalTitle extends Component {
  render() {
    const {title, inline, muted, className, children} = this.props;
    if (title) {
      return (
        <Row>
          <Col className={inline ? "pr-0 mt-2" : ""} md={inline ? 5 : 12}>
            <CBlockTitle text={title} small muted={muted}/>
          </Col>
          <Col className={inline ? "pl-0" : ""} md={inline ? 7 : 12}>
            {children}
          </Col>
        </Row>
      );
    } else {
      return React.cloneElement(children, {className: className});
    }
  }
}

COptionalTitle.defaultProps = defaultProps;
COptionalTitle.propTypes = propTypes;

export default COptionalTitle;
