import React, {Component} from 'react';

import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
  muted: PropTypes.bool,
  text: PropTypes.string,
  small: PropTypes.bool,
  font: PropTypes.string,
  center: PropTypes.string
};

const defaultProps = {
  small: false,
  muted: true,
  className: "",
  align: "left"
};

class CBlockTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.font = props.font ? props.font.replace("x", ".") + "rem" : "";
  }

  render() {
    const {className, small, muted, text, align} = this.props;
    const {font} = this.state;
    if (!this.props.text)
      return null;
    return (
      <p className={[className, (small ? "title-small" : ""), (muted ? "text-muted" : ""), "align-" + align].join(" ")}
      style={{'fontSize': font}}>{text}</p>
    );
  }
}

CBlockTitle.defaultProps = defaultProps;
CBlockTitle.propTypes = propTypes;

export default CBlockTitle;
