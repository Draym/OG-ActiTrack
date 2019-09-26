import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import DefaultAccountHeader from "./DefaultAccountHeader";
import $ from 'jquery';
import {Library} from "../../../utils/storage/Library";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  componentDidMount() {
    $('.navbar-toggler').on('click', function () {
      let item =  $('#accountMenu');
      if ($('.sidebar').css('marginLeft') === "0px") {
        item.removeClass("col-xs-4 col-sm-4 col-md-3 col-lg-3 col-md-3 pr-col-6");
        item.addClass("offset-xl-1 col-xs-4 col-sm-4 col-md-3 col-lg-2 col-xl-2");
        console.log("[1]: ", item);
      } else {
        item.removeClass("offset-xl-1 col-xs-4 col-sm-4 col-md-3 col-lg-2 col-xl-2");
        item.addClass("col-xs-4 col-sm-4 col-md-3 col-lg-3 col-md-3 pr-col-6");
        console.log("[2]: ", item);
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile/>
        <AppNavbarBrand
          href="/"
          full={{src: Library.logo, width: 200, height: 50, alt: 'OG-Tracker Logo'}}
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
