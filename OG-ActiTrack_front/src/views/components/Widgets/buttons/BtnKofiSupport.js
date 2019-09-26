import React, {Component} from 'react';
import CButtonImg from "../../CButton/CButtonImg";

import PropTypes from 'prop-types';
import CBlockTitle from "../../CBlockTitle/CBlockTitle";
import {Library} from "../../../../utils/storage/Library";

const propTypes = {
  width: PropTypes.number,
  center: PropTypes.bool,
  title: PropTypes.bool
};

const defaultProps = {
  width: 225,
  center: true,
  title: false
};

class BtnKofiSupport extends Component {

  render() {
    const {width, center, title} = this.props;
    return (
      <div>
        {title && <CBlockTitle text={"If you wish to support OG-Tracker, you can do so by inviting me for a coffee 😊"}
                               align={"center"} font="1x2"/>}
        <CButtonImg img={Library.kofiButton} imgAlt="Support me on Kofi" width={width} center={center}
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
