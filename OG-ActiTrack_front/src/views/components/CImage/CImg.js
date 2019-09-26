import React, {Component} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  data: PropTypes.object,
  src: PropTypes.string,
  alt: PropTypes.string
};

const defaultProps = {};

class CImg extends Component {

  render() {
    const {className, onClick, data, src, alt} = this.props;
    if (data) {
      return (
        <img onClick={onClick} alt={data.alt} src={data.src} className={className}/>
      );

    } else {
      return (
        <img onClick={onClick} alt={alt} src={src} className={className}/>
      );

    }
  }
}

CImg.propTypes = propTypes;
CImg.defaultProps = defaultProps;

export default CImg;
