import React, {Component} from 'react';
import CButtonImg from "../../CButton/CButtonImg";

import PropTypes from 'prop-types';
import CBlockTitle from "../../CBlockTitle/CBlockTitle";
import {Library} from "../../../../utils/storage/Library";

const propTypes = {
  width: PropTypes.number,
  className: PropTypes.string,
  center: PropTypes.bool,
  title: PropTypes.bool,
  radius: PropTypes.bool,
  button: PropTypes.object
};

const defaultProps = {
  width: 225,
  center: true,
  title: false,
  radius: true,
  button: Library.kofiButton
};

class BtnKofiSupport extends Component {

  render() {
    const {width, center, title, className, radius, button} = this.props;
    return (
      <div>
        {title && <CBlockTitle text={"If you wish to support OG-Tracker, you can do so by inviting me for a coffee 😊"}
                               position={"center"} font="1x2"/>}
        <CButtonImg className={className} img={button.src} imgAlt={button.alt} width={width} center={center}
                    radius={radius}
                    onClick={() => {
                      window.open("https://ko-fi.com/ogtracker", "_blank")
                    }}/>
      </div>

    );
  }
}

BtnKofiSupport.defaultProps = defaultProps;
BtnKofiSupport.propTypes = propTypes;

export default BtnKofiSupport;
