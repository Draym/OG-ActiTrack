import React, {Component} from 'react';
import {RoutesEndpoint} from "../../../Utils/RoutesEndpoint";
import {
  ListGroup, ListGroupItem
} from 'reactstrap';
import {withTranslation} from "react-i18next";
import UserSession from "../../../Utils/UserSession";

class AccountMenu extends Component {

  constructor(props) {
    super(props);
    this.goPremium = this.goPremium.bind(this);
    this.goSettings = this.goSettings.bind(this);
    this.goSecurity = this.goSecurity.bind(this);
    this.goRequest = this.goRequest.bind(this);
    this.goProfile = this.goProfile.bind(this);
  }

  goProfile(e) {
    e.preventDefault();
    this.props.history.push(RoutesEndpoint.ACCOUNT_Profile.replace(":pseudo", UserSession.getPseudo));
  }

  goSettings(e) {
    e.preventDefault();
    this.props.history.push(RoutesEndpoint.ACCOUNT_Settings.replace(":pseudo", UserSession.getPseudo));
  }

  goPremium(e) {
    e.preventDefault();
    this.props.history.push(RoutesEndpoint.ACCOUNT_Premium.replace(":pseudo", UserSession.getPseudo));
  }

  goSecurity(e) {
    e.preventDefault();
    this.props.history.push(RoutesEndpoint.ACCOUNT_Security.replace(":pseudo", UserSession.getPseudo));
  }

  goRequest(e) {
    e.preventDefault();
    this.props.history.push(RoutesEndpoint.ACCOUNT_Request.replace(":pseudo", UserSession.getPseudo));

  }

  render() {
    const {t, i18n} = this.props;
    return (
      <ListGroup>
        <ListGroupItem><strong>{t('header.account.title')}</strong></ListGroupItem>
        <ListGroupItem tag="button" onClick={this.goProfile} action>{t('header.account.profile')}</ListGroupItem>
        <ListGroupItem tag="button" onClick={this.goSecurity} action>{t('header.account.premium')}</ListGroupItem>
        <ListGroupItem tag="button" onClick={this.goSettings} action>{t('header.account.premium')}</ListGroupItem>
        <ListGroupItem tag="button" onClick={this.goPremium} action>{t('header.account.premium')}</ListGroupItem>
        <ListGroupItem tag="button" onClick={this.goRequest} action>{t('header.account.settings')}</ListGroupItem>
      </ListGroup>
    );
  }
}

export default withTranslation()(AccountMenu);
