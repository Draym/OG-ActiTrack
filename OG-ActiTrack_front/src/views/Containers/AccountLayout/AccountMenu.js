import React, {Component} from 'react';
import {RoutesEndpoint} from "../../../Utils/RoutesEndpoint";
import {
  ListGroup, ListGroupItem, Badge
} from 'reactstrap';
import {withTranslation} from "react-i18next";
import {withRouter} from 'react-router-dom';
import UserSession from "../../../Utils/UserSession";

class AccountMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: this.getStateFromHistory(this.props.history.location.pathname)
    };
    this.goPremium = this.goPremium.bind(this);
    this.goSettings = this.goSettings.bind(this);
    this.goSecurity = this.goSecurity.bind(this);
    this.goRequest = this.goRequest.bind(this);
    this.goProfile = this.goProfile.bind(this);
    this.goFriendList = this.goFriendList.bind(this);
    this.goGroupManagement = this.goGroupManagement.bind(this);
    this.goReportBug = this.goReportBug.bind(this);
  }
  componentWillUpdate(nextProps, nextState, nextContext) {
    this.state.selected = this.getStateFromHistory(this.props.history.location.pathname);
  }


  getStateFromHistory(location) {
    let path = location.slice(9);
    let nextDelim = path.indexOf("/");
    if (nextDelim < 0)
      return "profile";
    else
      return path.slice(nextDelim + 1);
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

  goFriendList(e) {
    e.preventDefault();
    this.props.history.push(RoutesEndpoint.ACCOUNT_FriendList.replace(":pseudo", UserSession.getPseudo));
  }

  goGroupManagement(e) {
    e.preventDefault();
    this.props.history.push(RoutesEndpoint.ACCOUNT_GroupManagement.replace(":pseudo", UserSession.getPseudo));
  }

  goReportBug(e) {
    e.preventDefault();
    this.props.history.push(RoutesEndpoint.ACCOUNT_ReportBug.replace(":pseudo", UserSession.getPseudo));
  }

  render() {
    const {t, i18n} = this.props;
    return (
      <div>
        <ListGroup>
          <ListGroupItem className="header">{t('label.accountMenu.sectionPersonal')}</ListGroupItem>
          <ListGroupItem active={this.state.selected === 'profile'} tag="button" onClick={this.goProfile}
                         action>{t('label.accountMenu.profile')}</ListGroupItem>
          <ListGroupItem active={this.state.selected === 'security'} tag="button" onClick={this.goSecurity}
                         action>{t('label.accountMenu.security')}</ListGroupItem>
          <ListGroupItem active={this.state.selected === 'settings'} tag="button" onClick={this.goSettings}
                         action>{t('label.accountMenu.settings')}</ListGroupItem>
          <ListGroupItem active={this.state.selected === 'premium'} tag="button" onClick={this.goPremium}
                         action>{t('label.accountMenu.premium')}</ListGroupItem>

        </ListGroup>
        <ListGroup>
          <ListGroupItem className="header">{t('label.accountMenu.sectionSocial')}</ListGroupItem>
          <ListGroupItem active={this.state.selected === 'friendList'} tag="button" onClick={this.goFriendList}
                         action>{t('label.accountMenu.friendList')}</ListGroupItem>
          <ListGroupItem disabled tag="button" onClick={this.goGroupManagement}
                         action>{t('label.accountMenu.groupManagement')} <Badge color="primary">SOON</Badge></ListGroupItem>
        </ListGroup>
        <ListGroup>
          <ListGroupItem className="header">{t('label.accountMenu.sectionContact')}</ListGroupItem>
          <ListGroupItem active={this.state.selected === 'request'} tag="button" onClick={this.goRequest}
                         action>{t('label.accountMenu.request')}</ListGroupItem>
          <ListGroupItem active={this.state.selected === 'reportBug'} tag="button" onClick={this.goReportBug}
                         action>{t('label.accountMenu.reportBug')}</ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

export default withTranslation()(withRouter(AccountMenu));
