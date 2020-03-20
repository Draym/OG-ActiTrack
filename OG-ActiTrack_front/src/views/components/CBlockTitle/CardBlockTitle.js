import React, {Component} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  small: PropTypes.bool
};

const defaultProps = {
  small: false
};

class CardBlockTitle extends Component {
  render() {
    const {small} = this.props;
    return (
      <div className={"markdown-bot" + (small ? "-small" : "")}>{this.props.children}</div>
    );
  }
}

CardBlockTitle.defaultProps = defaultProps;
CardBlockTitle.propTypes = propTypes;

export default CardBlockTitle;
