import React, {Component} from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav} from 'reactstrap';
import PropTypes from 'prop-types';

import {AppHeaderDropdown} from '@coreui/react';
import UserSession from "../../../Utils/UserSession";
import { withTranslation } from 'react-i18next';
import CLanguageCtrl from "../../Components/CLanguageCtrl";

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
    this.props.history.push('/login');
  }
  signIn(e) {
    e.preventDefault();
    this.props.history.push('/login');
  }
  goProfile(e) {
    e.preventDefault();
    this.props.history.push('/account/' + UserSession.getPseudo());
  }

  goPremium(e) {
    e.preventDefault();
    this.props.history.push('/account/' + UserSession.getPseudo() + '/premium');
  }

  goSettings(e) {
    e.preventDefault();
    this.props.history.push('/account/' + UserSession.getPseudo() + '/settings');
  }

  render() {
    const {t, i18n} = this.props;

    let getProfileDropDown = function() {
      if (UserSession.hasSession()) {
        return (
          <DropdownMenu right style={{right: 'auto'}}>
            <DropdownItem header tag="div" className="text-center"><strong>{t('header.account.title')}</strong></DropdownItem>
            <DropdownItem onClick={this.goProfile}><i className="fa fa-user"/>{t('account.profile')}</DropdownItem>
            <DropdownItem onClick={this.goPremium}><i className="fa fa-star"
                                                              style={{color: '#ffe200'}}/> {t('header.account.premium')}</DropdownItem>
            <DropdownItem onClick={this.goSettings}><i className="fa fa-wrench"/> {t('header.account.settings')}</DropdownItem>
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
            <img src={'../../assets/img/avatars/user_icon.png'} className="img-avatar"
                 alt="admin@bootstrapmaster.com"/>
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
