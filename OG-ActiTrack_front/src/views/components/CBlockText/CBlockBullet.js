import React, {Component} from 'react';

import PropTypes from 'prop-types';
import {Col, Row} from "reactstrap";

const propTypes = {
  className: PropTypes.string,
  muted: PropTypes.bool,
  font: PropTypes.string,
  center: PropTypes.string
};

const defaultProps = {
  muted: false,
  className: "",
  font: "1",
  align: "left"
};

class CBlockBullet extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.font = props.font.replace("x", ".") + "rem";
  }

  render() {
    const {className, muted, bullets, align} = this.props;
    const {font} = this.state;
    console.log("children: ", this.props.children);
    return (
      <ul>
        {React.Children.map(this.props.children, (child, i) => {
          return (
            <div>
            <li className={[className, (muted ? "text-muted" : ""), "align-" + align].join(" ")}
                style={{'fontSize': font}}>{child.props.value}</li>
          {child.props.children}
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
