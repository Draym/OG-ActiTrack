import React, {Component} from 'react';
import CButtonImg from "../../CButton/CButtonImg";
import kofiButton from '../../../../assets/img/kofisupport.png';

import PropTypes from 'prop-types';
import CBlockTitle from "../../CBlockTitle/CBlockTitle";

const propTypes = {
  width: PropTypes.number,
  center: PropTypes.bool,
  title: PropTypes.bool
};

const defaultProps = {
  width: 200,
  center: true,
  title: false
};

class BtnKofiSupport extends Component {

  render() {
    const {width, center, title} = this.props;
    return (
      <div>
        {title && <CBlockTitle text={"If you wish to support OG-Tracker, you can do so by inviting me for a coffee 😊"}
                               align={"center"} font="1x1"/>}
        <CButtonImg img={kofiButton} imgAlt="Support me on Kofi" width={width} center={center}
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
