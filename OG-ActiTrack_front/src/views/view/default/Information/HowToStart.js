import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import CBlockText from "../../../components/CBlockText/CBlockText";
import CLink from "../../../components/CLink/CLink";
import {RoutesEndpoint} from "../../../../utils/RoutesEndpoint";
import CBulletList from "../../../components/CBulletList/CBulletList";
import CBulletItem from "../../../components/CBulletList/CBulletItem";
import CImg from "../../../components/CImage/CImg";
import {Library} from "../../../../utils/storage/Library";

class HowToStart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardBody className="ml-md-5">
            <h2>Welcome to OG-Tracker</h2>
            <Row>
              <Col>
                <CBlockText color="muted">
                  OG-Tracker is a tool which track other player activity while you are playing Ogame.
                  With the data collected, it can create activity reports and offer data analysis tools.
                </CBlockText>
              </Col>
            </Row>
            <Row className="ml-md-4 mt-3">
              <Col>
                <h4>1) Create an account on OG-Tracker website</h4>
                <CBulletList color="secondary">
                  <CBulletItem>If you already create an account: go to the
                    <CLink className="ml-sm-1 ml-md-1" goTo={RoutesEndpoint.AUTH_Login}>Login page</CLink></CBulletItem>
                  <CBulletItem>Else click there to
                    <CLink className="ml-sm-1 ml-md-1" goTo={RoutesEndpoint.AUTH_Register}>Create an Account</CLink>
                  </CBulletItem>
                </CBulletList>
              </Col>
            </Row>
            <Row className="ml-md-4">
              <Col>
                <h4>2) Install the script on your browser</h4>
                <CBulletList color="secondary">
                  <CBulletItem>On Google Chrome:</CBulletItem>
                  <CBulletItem level={2}>Install or update
                    <CLink shift external
                           goTo={"https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo"}>Tamper
                      Monkey</CLink>
                  </CBulletItem>
                  <CBulletItem>On Firefox:</CBulletItem>
                  <CBulletItem level={2}>Install or update
                    <CLink shift external
                           goTo={"https://addons.mozilla.org/fr/firefox/addon/greasemonkey"}>Grease Monkey</CLink>
                  </CBulletItem>
                  <CBulletItem className="mt-3">Install the
                    <CLink shift external
                           goTo="https://openuserjs.org/install/OG-Tracker/OG-Tracker.user.js">OG-Tracker script</CLink>
                  </CBulletItem>
                </CBulletList>
              </Col>
            </Row>
            <Row className="ml-md-4">
              <Col>
                <h4>3) How to use the tool</h4>
                <CBulletList color="secondary">
                  <CBulletItem>Before continue you need ot have an account and have installed the scrip on your browser ⬆</CBulletItem>
                  <CBulletItem>Go to Ogame and login</CBulletItem>
                  <CBulletItem>You should see that a new menu <CImg className="mx-2" width={120} data={Library.ogtrackerBtn}/> in Ogame, click on it</CBulletItem>
                  <CBulletItem>A popup should then appear asking you to login: Login using the same identifier as this website</CBulletItem>
                </CBulletList>
              </Col>
            </Row>
            <Row className="ml-md-4">
              <Col>
                <h4>4) Your are ready to collect data</h4>
                <CBulletList color="secondary">
                  <CBulletItem>Start to collect data :</CBulletItem>
                  <CBulletItem level={2}>Go to the Ranking page to collect player ranks -> this data will be completed by other users</CBulletItem>
                  <CBulletItem level={2}>Go to the galaxy page and navigate as usual</CBulletItem>
                  <CBulletItem level={2}>For better result, choose a player and check each of its planet at regular time (each hour or so)</CBulletItem>
                  <CBulletItem>Go to <CLink shift goTo={RoutesEndpoint.PLAYER_Activity}>Player Activity</CLink> :</CBulletItem>
                  <CBulletItem level={2}>Select the server you are on and the player pseudo you have tracked previously ⬆</CBulletItem>
                  <CBulletItem level={2}>Select the date range (today for example) and generate the graphic</CBulletItem>
                  <CBulletItem level={2}>Be sure to have collected data for that specific user in amount</CBulletItem>
                </CBulletList>
              </Col>
            </Row>
            <Row className="ml-md-4">
              <Col>
                <h4>5) You are good to go! </h4>
                <CBulletList color="secondary">
                  <CBulletItem>Explore the other possibility such as Spy Reports</CBulletItem>
                  <CBulletItem>Explore your universe efficiently with Colonial & Military reports</CBulletItem>
                </CBulletList>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default HowToStart;
