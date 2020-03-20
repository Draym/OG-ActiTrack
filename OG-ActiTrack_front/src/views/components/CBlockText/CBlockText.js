import React, {Component} from 'react';

import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  position: PropTypes.string
};

const defaultProps = {
  className: "",
  fontSize: "1",
  position: "left"
};

class CBlockText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: props.color ? "text-" + props.color : "",
      fontSize: props.fontSize.replace("x", ".") + "rem",
      position: "align-" + props.position
    };
  }

  render() {
    const {className, text, children} = this.props;
    const {color, position, fontSize} = this.state;
    return (
      <p className={[className, position, color].join(" ")}
      style={{'fontSize': fontSize}}>{text ? text : children}</p>
    );
  }
}

CBlockText.defaultProps = defaultProps;
CBlockText.propTypes = propTypes;

export default CBlockText;
