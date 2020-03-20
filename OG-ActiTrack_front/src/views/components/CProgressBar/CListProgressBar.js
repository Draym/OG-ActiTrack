import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from "reactstrap/es";
import CBlockTitle from "../CBlockTitle/CBlockTitle";

const propTypes = {
  className: PropTypes.string,
  inlineTitle: PropTypes.bool
};

const defaultProps = {
  inlineTitle: true
};

class CListProgressBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {className, inlineTitle, children} = this.props;

    let drawInlineChildren = function () {
      return React.Children.map(children, (child, i) => {
        return (
          <Row key={i}>
            <Col xs={12} sm={12} md={2} className="pr-0">
              <CBlockTitle text={child.props.title} small muted/>
            </Col>
            <Col xs={12} sm={12} md={10} className="my-auto">
              {React.cloneElement(child, {title: undefined})}
            </Col>
          </Row>)
      });
    };
    return (
      <div className={className}>
        {inlineTitle ? drawInlineChildren() : children}
      </div>
    );
  }
}

CListProgressBar.propTypes = propTypes;
CListProgressBar.defaultProps = defaultProps;

export default CListProgressBar;
