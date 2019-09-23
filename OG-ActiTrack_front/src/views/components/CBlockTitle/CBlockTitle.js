import React, {Component} from 'react';

import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
  muted: PropTypes.bool,
  text: PropTypes.string,
  head: PropTypes.bool,
  font: PropTypes.string,
  center: PropTypes.string
};

const defaultProps = {
  head: false,
  muted: true,
  className: "",
  font: "1",
  align: "left"
};

class CBlockTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.font = props.font.replace("x", ".") + "rem";
  }

  render() {
    const {className, head, muted, text, align} = this.props;
    const {font} = this.state;
    if (!this.props.text)
      return null;
    return (
      <p className={[className, (head ? "title-small" : ""), (muted ? "text-muted" : ""), "align-" + align].join(" ")}
      style={{'fontSize': font}}>{text}</p>
    );
  }
}

CBlockTitle.defaultProps = defaultProps;
CBlockTitle.propTypes = propTypes;

export default CBlockTitle;
