import React, {Component} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  level: PropTypes.number
};

const defaultProps = {
  level: 1
};

class CBulletItem extends Component {
  render() {
    const {children} = this.props;
    return (
      <div>{children}</div>
    );
  }
}

CBulletItem.defaultProps = defaultProps;
CBulletItem.propTypes = propTypes;

export default CBulletItem;
