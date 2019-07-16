import React, {Component} from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav} from 'reactstrap';
import PropTypes from 'prop-types';

import {AppHeaderDropdown} from '@coreui/react';
import UserSession from "../../../Utils/UserSession";
import { withTranslation } from 'react-i18next';
import {RoutesEndpoint} from "../../../Utils/RoutesEndpoint";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultAccountHeader extends Component {

  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
    this.signIn = this.signIn.bind(this);
    this.goProfile = this.goProfile.bind(this);
    this.goPremium = this.goPremium.bind(this);
    this.goSettings = this.goSettings.bind(this);
  }

  signOut(e) {
    e.preventDefault();
    UserSession.clearSession();
    this.props.history.push(RoutesEndpoint.AUTH_Login);
  }
  signIn(e) {
    e.preventDefault();
    this.props.history.push(RoutesEndpoint.AUTH_Login);
  }
  goProfile(e) {
    e.preventDefault();
    this.props.history.push(RoutesEndpoint.ACCOUNT_User.replace(":pseudo", UserSession.getPseudo));
  }

  goPremium(e) {
    e.preventDefault();
    this.props.history.push(RoutesEndpoint.ACCOUNT_Premium.replace(":pseudo", UserSession.getPseudo));
  }

  goSettings(e) {
    e.preventDefault();
    this.props.history.push(RoutesEndpoint.ACCOUNT_Settings.replace(":pseudo", UserSession.getPseudo));
  }

  render() {
    const {t, i18n} = this.props;

    let getProfileDropDown = function() {
      if (UserSession.hasSession()) {
        return (
          <DropdownMenu right style={{right: 'auto'}}>
            <DropdownItem header tag="div" className="text-center"><strong>{t('header.account.title')}</strong></DropdownItem>
            <DropdownItem onClick={this.goProfile}><i className="fa fa-user"/>{t('header.account.profile')}</DropdownItem>
            <DropdownItem onClick={this.goPremium}><i className="fa fa-star"
                                                              style={{color: '#ffe200'}}/> {t('header.account.premium')}</DropdownItem>
            <DropdownItem className="border-bottom-off" onClick={this.goSettings}><i className="fa fa-wrench"/> {t('header.account.settings')}</DropdownItem>
            <DropdownItem divider/>
            <DropdownItem onClick={this.signOut}><i className="fa fa-lock"/> {t('header.account.signOut')}</DropdownItem>
          </DropdownMenu>);
      } else {
        return (
          <DropdownMenu right style={{right: 'auto'}}>
            <DropdownItem header tag="div" className="text-center"><strong>{t('header.account.title')}</strong></DropdownItem>
            <DropdownItem onClick={this.signIn}><i className="fa fa-user-o"/> {t('header.account.signIn')}</DropdownItem>
          </DropdownMenu>);
      }
    }.bind(this);
    return (
      <Nav className="ml-auto" navbar>
        <AppHeaderDropdown direction="down">
          <DropdownToggle nav>
            <img src={'../../assets/img/avatars/user_icon.png'} className="img-avatar" alt={"wigmo.main@gmail.com"}/>
          </DropdownToggle>
          {getProfileDropDown()}
        </AppHeaderDropdown>
      </Nav>
    );
  }
}

DefaultAccountHeader.propTypes = propTypes;
DefaultAccountHeader.defaultProps = defaultProps;

export default  withTranslation()(DefaultAccountHeader);
