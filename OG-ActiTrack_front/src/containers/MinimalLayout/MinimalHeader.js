import React, {Component} from 'react';

import {AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import logo from '../../assets/img/brand/logo.png'

class MinimalHeader extends Component {
  render() {
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile/>
        <AppNavbarBrand
          href="/"
          full={{src: logo, width: 150, height: 31, alt: 'ActiTrack Logo'}}
        />
      </React.Fragment>
    );
  }
}

export default MinimalHeader;
