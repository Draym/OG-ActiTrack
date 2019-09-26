import React, {Component} from 'react';

const propTypes = {};
const defaultProps = {};

class CTextLight extends Component {

  render() {
    const {children} = this.props;
    return (
      <span className="txt-light">{children}</span>
    );
  }
}

CTextLight.propTypes = propTypes;
CTextLight.defaultProps = defaultProps;

export default  CTextLight;
