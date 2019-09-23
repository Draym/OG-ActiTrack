import React, {Component} from 'react';

import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
  muted: PropTypes.bool,
  text: PropTypes.string,
  font: PropTypes.string,
  center: PropTypes.string
};

const defaultProps = {
  muted: false,
  className: "",
  font: "1",
  align: "left"
};

class CBlockText extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.font = props.font.replace("x", ".") + "rem";
  }

  render() {
    const {className, muted, text, align} = this.props;
    const {font} = this.state;
    if (!this.props.text)
      return null;
    return (
      <p className={[className, (muted ? "text-muted" : ""), "align-" + align].join(" ")}
      style={{'fontSize': font}}>{text}</p>
    );
  }
}

CBlockText.defaultProps = defaultProps;
CBlockText.propTypes = propTypes;

export default CBlockText;
