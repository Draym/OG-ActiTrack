import React, {Component} from 'react';

const propTypes = {
};

const defaultProps = {
};

class CardBlockTitle extends Component {
  render() {
    return (
      <h4 className="markdown-bot">{this.props.children}</h4>
    );
  }
}

CardBlockTitle.defaultProps = defaultProps;
CardBlockTitle.propTypes = propTypes;

export default CardBlockTitle;
