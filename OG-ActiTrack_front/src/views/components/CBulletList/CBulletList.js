import React, {Component} from 'react';
import {Col, Row} from "reactstrap";

import PropTypes from 'prop-types';
import TLogs from "../../../utils/TLogs";

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

class CBulletList extends Component {
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
    return (
      <ul>
        {React.Children.map(this.props.children, child => {
          TLogs.p("Child type:", child.type.name);
          if (child.type.name !== 'CBulletItem')
            throw new TypeError('CBulletList can only contains CBulletItem child');
          return (
            <div>
              <li className={[className, align, color].join(" ")}
                  style={{'fontSize': fontSize, 'marginLeft': ((child.props.level - 1) * 2) + 'rem', 'listStyleType': child.props.level > 1 ? 'circle' : ''}}>
                <Row>
                  <Col className={"pr-0 " + child.props.className ? child.props.className : ""} style={{display: "flex"}}>
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

CBulletList.defaultProps = defaultProps;
CBulletList.propTypes = propTypes;

export default CBulletList;
