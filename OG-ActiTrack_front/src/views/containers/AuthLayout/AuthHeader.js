import React, {Component} from 'react';

import {AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import logo from '../../../assets/img/brand/logo.png'
import CLanguageCtrl from "../../components/CLanguageCtrl";


class AuthHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile/>
        <AppNavbarBrand
          href="/"
          full={{src: logo, width: 200, height: 50, alt: 'OG-Tracker Logo'}}
        />
        <CLanguageCtrl className="float-right"/>
      </React.Fragment>
    );
  }
}

export default AuthHeader;
