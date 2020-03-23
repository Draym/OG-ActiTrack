import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  img: PropTypes.string,
  imgAlt: PropTypes.string,
  onClick: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  radius: PropTypes.bool,
  center: PropTypes.bool
};

const defaultProps = {
  radius: false,
  text: undefined,
  center: false,
  className: ""
};

class CButtonImg extends Component {

  render() {
    const {text, className, onClick, img, imgAlt, width, height, radius, center} = this.props;
    return (
      <div className={classNames("btn-image", className, radius ? "btn-image-radius" : "")} style={{width: width, height: 'auto', 'margin': (center ? 'auto' : null)}} onClick={onClick} >
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
