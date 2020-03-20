import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import DefaultAccountHeader from "./DefaultAccountHeader";
import $ from 'jquery';
import {Library} from "../../../utils/storage/Library";
import {RoutesEndpoint} from "../../../utils/RoutesEndpoint";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.onLogoClick = this.onLogoClick.bind(this);
  }

  componentDidMount() {
    $('.navbar-toggler').on('click', function () {
      let item = $('#accountMenu');
      if ($('body').hasClass("sidebar-lg-show")) {
        item.removeClass("col-xs-4 col-sm-4 col-md-3 col-lg-3 col-md-3 pr-col-6");
        item.addClass("offset-xl-1 col-xs-4 col-sm-4 col-md-3 col-lg-2 col-xl-2");
      } else {
        item.removeClass("offset-xl-1 col-xs-4 col-sm-4 col-md-3 col-lg-2 col-xl-2");
        item.addClass("col-xs-4 col-sm-4 col-md-3 col-lg-3 col-md-3 pr-col-6");
      }
    });
  }

  onLogoClick(e) {
    e.preventDefault();
    let body = $('body');
    if (!body.hasClass("sidebar-lg-show")) {
      body.addClass("sidebar-lg-show");
    }
    this.props.history.push(RoutesEndpoint.HOME);
  }

  render() {
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile/>
        <AppNavbarBrand
          onClick={this.onLogoClick}
          full={{src: Library.logo.src, width: 200, height: 50, alt: Library.logo.alt}}
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
