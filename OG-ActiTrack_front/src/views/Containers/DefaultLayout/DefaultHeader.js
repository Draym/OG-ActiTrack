import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import logo from '../../../assets/img/brand/logo.png'
import DefaultAccountHeader from "./DefaultAccountHeader";
import CLanguageCtrl from "../../Components/CLanguageCtrl";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile/>
          <AppNavbarBrand
            href="/"
            full={{src: logo, width: 150, height: 31, alt: 'ActiTrack Logo'}}
          />
        <AppSidebarToggler className="d-md-down-none" display="lg"/>
        <DefaultAccountHeader {...this.props}/>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
