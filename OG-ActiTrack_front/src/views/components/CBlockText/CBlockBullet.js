import React, {Component} from 'react';
import {Col, Row} from "reactstrap";

import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  center: PropTypes.string
};

const defaultProps = {
  muted: false,
  className: "",
  fontSize: "1",
  align: "left"
};

class CBlockBullet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: props.color ? "text-" + props.color : "",
      fontSize: props.fontSize ? props.fontSize.replace("x", ".") + "rem" : "",
      align: "align-" + props.align
    };
  }

  render() {
    const {className} = this.props;
    const {color, align, fontSize} = this.state;
    console.log("children: ", this.props.children);
    return (
      <ul>
        {React.Children.map(this.props.children, (child, i) => {
          return (
            <div>
              <li className={[className, align, color].join(" ")}
                  style={{'fontSize': fontSize}}>
                <Row>
                  <Col className="pr-0" style={{display: "flex"}}>
                    <span>{child.props.value}</span>
                    {child.props.children}
                  </Col>
                </Row>
              </li>
            </div>
          )
        })}
      </ul>
    );
  }
}

CBlockBullet.defaultProps = defaultProps;
CBlockBullet.propTypes = propTypes;

export default CBlockBullet;
