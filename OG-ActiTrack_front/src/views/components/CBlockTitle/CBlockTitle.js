import React, {Component} from 'react';

import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
  muted: PropTypes.bool,
  text: PropTypes.string,
  small: PropTypes.bool,
  fontSize: PropTypes.string,
  position: PropTypes.string
};

const defaultProps = {
  small: false,
  muted: true,
  className: "",
  position: "left"
};

class CBlockTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: props.fontSize ? props.fontSize.replace("x", ".") + "rem" : ""
    };
  }

  render() {
    const {className, small, muted, text, position, children} = this.props;
    const {fontSize} = this.state;
    if (!this.props.text)
      return null;
    return (
      <p className={[className, (small ? "title-small" : ""), (muted ? "text-muted" : ""), "align-" + position].join(" ")}
      style={{'fontSize': fontSize}}>{text}{children}</p>
    );
  }
}

CBlockTitle.defaultProps = defaultProps;
CBlockTitle.propTypes = propTypes;

export default CBlockTitle;
