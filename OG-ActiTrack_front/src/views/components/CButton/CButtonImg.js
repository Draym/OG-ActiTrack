import React, {Component} from 'react';

import PropTypes from 'prop-types';

const propTypes = {
  text: PropTypes.string,
  img: PropTypes.string,
  imgAlt: PropTypes.string,
  onClick: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  center: PropTypes.bool
};

const defaultProps = {
  text: undefined,
  center: false
};

class CButtonImg extends Component {

  render() {
    const {text, onClick, img, imgAlt, width, height, center} = this.props;
    return (
      <div className="btn-image" style={{width: width, height: 'auto', 'margin': (center ? 'auto' : null)}} onClick={onClick} >
        <img src={img} alt={imgAlt} width={width} height={height}/>
        {text && <span>{text}</span>}
        <div className="color-overlay"/>
      </div>
    );
  }
}

CButtonImg.defaultProps = defaultProps;
CButtonImg.propTypes = propTypes;

export default CButtonImg;
