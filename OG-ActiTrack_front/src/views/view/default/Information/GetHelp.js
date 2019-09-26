import React, {Component} from 'react';
import {Card, CardBody, Col, Row} from 'reactstrap';
import CAccordion from "../../../components/CAccordion/CAccordion";
import CAccordionItem from "../../../components/CAccordion/CAccordionItem";
import {RoutesEndpoint} from "../../../../utils/RoutesEndpoint";
import {Library} from "../../../../utils/storage/Library";
import CLink from "../../../components/CLink/CLink";
import CImg from "../../../components/CImage/CImg";
import CTextLight from "../../../components/CBlockText/CTextLight";
import TSessionTransform from "../../../../utils/TSessionTransform";
import UserSession from "../../../../utils/storage/UserSession";
import CBlockBullet from "../../../components/CBlockText/CBlockBullet";

class GetHelp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.goTo = this.goTo.bind(this);
  }

  goTo(e, route) {
    e.preventDefault();
    this.props.history.push(route);
  }

  render() {
    return (
      <div className="animated fadeIn mb-2">
        <Card>
          <CardBody>
            <Row className="mb-4">
              <Col>
                <h3>
                  Hey there 👋 how can we help ?
                </h3>
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                <CAccordion color="light">
                  <CAccordionItem title={"How to use OG-Tracker ?"}>
                    <span>haha</span>
                  </CAccordionItem>
                  <CAccordionItem title={"Where is my profile ?"}>
                    <p>The profile icon is designed by <CImg className="m-1 img-sm" data={Library.userIcon}/> that you
                      can find at the top right of the
                      screen.</p>
                    <p>You can go to your profile by <CLink
                      onClick={(e) => this.goTo(e, RoutesEndpoint.ACCOUNT_Profile)}>clicking
                      here</CLink></p>
                  </CAccordionItem>
                  <CAccordionItem title={"How to change my password ?"}>
                    <p>You can change your password in the Security panel of your Profile: <CLink
                      onClick={(e) => this.goTo(e, RoutesEndpoint.ACCOUNT_Security)}>change my password</CLink></p>
                  </CAccordionItem>
                  <CAccordionItem title={"How to add a friend ?"}>
                    <p>You can add a friend in the Friend List panel of your Profile: <CLink
                      onClick={(e) => this.goTo(e, RoutesEndpoint.ACCOUNT_FriendList)}>add
                      a friend</CLink></p>
                    <p>You need to enter your friend Profile Identifier in requested field.</p>
                    <p>The Profile Identifier can be found on the Friend List view.</p>
                    <p>For example: <span className="code-highlight">pseudo#dP1mVt</span></p>
                  </CAccordionItem>
                  <CAccordionItem title={"How to contact us ?"}>
                    <p>The contact panel is available through your Profile menu.</p>
                    <p>Please use the following form to contact us: <CLink
                      onClick={(e) => this.goTo(e, RoutesEndpoint.ACCOUNT_Contact)}>contact us 📧</CLink></p>
                  </CAccordionItem>
                  <CAccordionItem title={"How to report a bug ?"}>
                    <p>The report bug panel is available through your Profile menu.</p>
                    <p>Please use the following form to report a bug: <CLink
                      onClick={(e) => this.goTo(e, RoutesEndpoint.ACCOUNT_BugReport)}>report a bug 🐛</CLink></p>
                  </CAccordionItem>
                </CAccordion>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                <CAccordion color="light">
                  <CAccordionItem title={"What is the premium access ?"}>
                    <p>A premium access is a thankful gift after a
                      <CLink onClick={(e) => this.goTo(e, RoutesEndpoint.ACCOUNT_Premium)}> donation <CImg
                        className="img-xxs" data={Library.kofiLogo}/> </CLink></p>
                    <p>All the functionality of OG-Tracker are free and publicity free. The tools is based on personal
                      use and all the report you can create is base on the data you collected.</p>
                    <p><CTextLight>The premium access</CTextLight> only offer a way to use data that <CTextLight>you did
                      not collect yourself</CTextLight>. This means that even if your are not fully active on Ogame, you
                      still can have decent data.</p>
                    <p>By the way the premium access is valid for ever. 💝</p>
                  </CAccordionItem>
                  <CAccordionItem title={"How can i share data with friends ?"}>
                    <p>The data you collected will be automatically shared with your Friend list.</p>
                    <p>Share your Profile Identifier to your future friend: <span
                      className="code-highlight font-lg">{TSessionTransform.getProfileId(UserSession.getSession())}</span>
                    </p>
                  </CAccordionItem>
                  <CAccordionItem title={"How does my friend list impact me ?"}>
                    <p>Once you have a friend or more in your <CLink
                      onClick={(e) => this.goTo(e, RoutesEndpoint.ACCOUNT_FriendList)}>Friend List</CLink>, their data
                      will be added to yours.</p>
                    <p>This means that your future reports will take in account your data and your friends data. More
                      active friend you have, more data you will have, better your reports will be 🔥</p>
                  </CAccordionItem>
                  <CAccordionItem title={"How OG-Tracker retrieve data ?"}>
                    <p>OG-Tracker is using a custom script that you have installed on your browser : <CLink
                      onClick={(e) => this.goTo(e, RoutesEndpoint.HOWTOSTART)}>Installation Guide</CLink></p>
                    <p>🤖 It reads the web page content when you are playing Ogame and send it to our servers. All the
                      data you collect are associated to your own account</p>
                    <p>⚠ Be sure to have login properly your account with the browser script (new menu in Ogame
                      menu).</p>
                  </CAccordionItem>
                  <CAccordionItem title={"Do OG-Tracker track my own activity ?"}>
                    <p><CTextLight>OG-Tracker will never retrieve data about yourself</CTextLight>, nor your activity in
                      Ogame. It is our duty to be fully transparent with you with the information we retrieve.</p>
                    <p>OG-Tracker doesn't even collect your own planet activity & position when you use the Ogame galaxy
                      page, only the activity of other players are collected. 🔎</p>
                    <p>Please <CLink onClick={(e) => this.goTo(e, RoutesEndpoint.ACCOUNT_Contact)}>contact us</CLink> to
                      have more information.</p>
                  </CAccordionItem>
                  <CAccordionItem title={"What data OG-Tracker are using ?"}>
                    <p>OG-Tracker is collecting and using the following data :</p>
                    <CBlockBullet>
                      <div value="Galaxy page: planet/moon position, player name, activity on planet/moon"/>
                      <div value="Message page: spy reports"/>
                      <div value="Ranking page: rank of players"/>
                    </CBlockBullet>
                  </CAccordionItem>
                </CAccordion>
              </Col>
            </Row>
            <Row className="mt-7 mb-3">
              <Col>
                <h5>
                  Looking for something else ? <a href={RoutesEndpoint.ACCOUNT_Contact}>Please contact us 📧</a>
                </h5>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default GetHelp;
