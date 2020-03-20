import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from "reactstrap/es";

const propTypes = {
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  className: PropTypes.string
};

const defaultProps = {
  className: ""
};

class CCardGroup extends Component {
  render() {
    const {children, className, xs, sm, md, lg, xl} = this.props;
    return (
      <Row className={"row-col " + className}>
        {
          React.Children.map(children, (child, key) => {
            return (
              <Col className="p-0" xs={xs} sm={sm} md={md} lg={lg} xl={xl} key={key}>
                {child}
              </Col>
            );
          })
        }
      </Row>
    );
  }
}

CCardGroup.defaultProps = defaultProps;
CCardGroup.propTypes = propTypes;

export default CCardGroup;
