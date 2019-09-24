import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import logo from '../../../assets/img/brand/logo.png'
import DefaultAccountHeader from "./DefaultAccountHeader";
import $ from 'jquery';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  componentDidMount() {
    $('.d-md-down-none.navbar-toggler').on('click', function () {
      if ($('.sidebar').css('marginLeft') === "0px") {
        $('#accountMenu').removeClass("col-md-3 pr-6");
        $('#accountMenu').addClass("offset-xl-1 col-md-2");
      } else {
        $('#accountMenu').removeClass("offset-xl-1 col-md-2");
        $('#accountMenu').addClass("col-md-3 pr-6");
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile/>
        <AppNavbarBrand
          href="/"
          full={{src: logo, width: 200, height: 50, alt: 'OG-Tracker Logo'}}
        />
        <AppSidebarToggler id="menu-toggle-icon" className="d-md-down-none" display="lg"/>
        <DefaultAccountHeader {...this.props}/>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
