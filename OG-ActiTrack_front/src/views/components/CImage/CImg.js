import React, {Component} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  data: PropTypes.object,
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};

const defaultProps = {};

class CImg extends Component {

  render() {
    const {className, onClick, data, src, alt, width, height} = this.props;
    if (data) {
      return (
        <img onClick={onClick} alt={data.alt} src={data.src} width={width} height={height} className={className}/>
      );

    } else {
      return (
        <img onClick={onClick} alt={alt} src={src} width={width} height={height} className={className}/>
      );

    }
  }
}

CImg.propTypes = propTypes;
CImg.defaultProps = defaultProps;

export default CImg;
