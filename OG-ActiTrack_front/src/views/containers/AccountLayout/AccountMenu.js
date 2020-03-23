import React, {Component} from 'react';
import {RoutesEndpoint} from "../../../utils/RoutesEndpoint";
import {
  ListGroup, ListGroupItem, Badge
} from 'reactstrap';
import {withTranslation} from "react-i18next";
import {withRouter} from 'react-router-dom';
import UserSession from "../../../utils/storage/UserSession";
import $ from 'jquery';
import PremiumStar from "../../components/Widgets/reusable/PremiumStar";

class AccountMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: this.getStateFromHistory(this.props.history.location.pathname),
      isPremium: UserSession.isPremium()
    };
    this.goPremium = this.goPremium.bind(this);
    this.goDashboardSettings = this.goDashboardSettings.bind(this);
    this.goSecurity = this.goSecurity.bind(this);
    this.goContact = this.goContact.bind(this);
    this.goProfile = this.goProfile.bind(this);
    this.goFriendList = this.goFriendList.bind(this);
    this.goGroupManagement = this.goGroupManagement.bind(this);
    this.goBugReport = this.goBugReport.bind(this);
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    this.state.selected = this.getStateFromHistory(this.props.history.location.pathname);
  }

  componentDidMount() {
    $('#menu-toggle-icon').click();
  }

  getStateFromHistory(location) {
    let path = location.slice(9);
    if (path.length === 0)
      return "profile";
    /*
    ** USED WHEN USER WAS IN PATH
    let nextDelim = path.indexOf("/");
    console.log(nextDelim)
    if (nextDelim < 0)
      return "profile";
    else
      return path.slice(nextDelim + 1);*/
  }

  goProfile(e) {
    e.preventDefault();
    this.props.history.push(RoutesEndpoint.ACCOUNT_Profile);
  }

  goDashboardSettings(e) {
    e.preventDefault();
    this.props.history.push(RoutesEndpoint.ACCOUNT_DashboardSettings);
  }

  goPremium(e) {
    e.preventDefault();
    this.props.history.push(RoutesEndpoint.ACCOUNT_Premium);
  }

  goSecurity(e) {
    e.preventDefault();
    this.props.history.push(RoutesEndpoint.ACCOUNT_Security);
  }

  goContact(e) {
    e.preventDefault();
    this.props.history.push(RoutesEndpoint.ACCOUNT_Contact);
  }

  goFriendList(e) {
    e.preventDefault();
    this.props.history.push(RoutesEndpoint.ACCOUNT_FriendList);
  }

  goGroupManagement(e) {
    e.preventDefault();
    this.props.history.push(RoutesEndpoint.ACCOUNT_GroupManagement);
  }

  goBugReport(e) {
    e.preventDefault();
    this.props.history.push(RoutesEndpoint.ACCOUNT_BugReport);
  }

  render() {
    const {t} = this.props;
    return (
      <div>
        <ListGroup>
          <ListGroupItem className="header">{t('label.accountMenu.sectionPersonal')}</ListGroupItem>
          <ListGroupItem active={this.state.selected === 'profile'} tag="button" onClick={this.goProfile}
                         action>{t('label.accountMenu.profile')}</ListGroupItem>
          <ListGroupItem active={this.state.selected === 'security'} tag="button" onClick={this.goSecurity}
                         action>{t('label.accountMenu.security')}</ListGroupItem>
          <ListGroupItem disabled tag="button" onClick={this.goDashboardSettings}
                         action>{t('label.accountMenu.dashboardSettings')} <Badge
            color="primary">SOON</Badge></ListGroupItem>
          <ListGroupItem active={this.state.selected === 'premium'} tag="button" onClick={this.goPremium}
                         action>{this.state.isPremium &&
          <PremiumStar/>} {t('label.accountMenu.premium')}</ListGroupItem>
        </ListGroup>
        <ListGroup>
          <ListGroupItem className="header">{t('label.accountMenu.sectionSocial')}</ListGroupItem>
          <ListGroupItem active={this.state.selected === 'friendList'} tag="button" onClick={this.goFriendList}
                         action>{t('label.accountMenu.friendList')}</ListGroupItem>
          <ListGroupItem disabled tag="button" onClick={this.goGroupManagement}
                         action>{t('label.accountMenu.groupManagement')} <Badge
            color="primary">SOON</Badge></ListGroupItem>
        </ListGroup>
        <ListGroup>
          <ListGroupItem className="header">{t('label.accountMenu.sectionContact')}</ListGroupItem>
          <ListGroupItem active={this.state.selected === 'contact'} tag="button" onClick={this.goContact}
                         action>{t('label.accountMenu.contact')}</ListGroupItem>
          <ListGroupItem active={this.state.selected === 'bugReport'} tag="button" onClick={this.goBugReport}
                         action>{t('label.accountMenu.bugReport')}</ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

export default withTranslation()(withRouter(AccountMenu));
