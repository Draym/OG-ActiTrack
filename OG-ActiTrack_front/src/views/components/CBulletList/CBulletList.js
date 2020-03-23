import React, {Component} from 'react';
import {Col, Row} from "reactstrap";

import PropTypes from 'prop-types';
import TChildControl from "../../../utils/TChildControl";

const propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  center: PropTypes.bool
};

const defaultProps = {
  muted: false,
  className: "",
  fontSize: "1"
};

class CBulletList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: props.color ? "text-" + props.color : "",
      fontSize: props.fontSize ? props.fontSize.replace("x", ".") + "rem" : ""
    };
  }

  render() {
    const {className, center} = this.props;
    const {color, fontSize} = this.state;
    return (
      <ul className={center ? "ul-center" : ""}>
        {React.Children.map(this.props.children, child => {
          TChildControl.validate(child, "CBulletList", "CBulletItem");
          return (
            <div>
              <li className={[className, color].join(" ")}
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
