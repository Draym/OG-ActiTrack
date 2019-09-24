import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';

import BtnKofiSupport from "../../../components/Widgets/buttons/BtnKofiSupport";
import CBlockText from "../../../components/CBlockText/CBlockText";
import CBlockBullet from "../../../components/CBlockText/CBlockBullet";
import CPopInfo from "../../../components/CPopup/CPopInfo";
import UserSession from "../../../../utils/storage/UserSession";

class Premium extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: UserSession.getSession().user
    }
  }

  render() {
    let drawPremiumDashboard = function () {
      return (
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={10}>
            <Card>
              <CardHeader>Premium Dashboard</CardHeader>
              <CardBody>

              </CardBody>
            </Card>
          </Col>
        </Row>
      );
    };
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={10}>
            <Card>
              <CardHeader>Support OG-Tracker</CardHeader>
              <CardBody>
                <BtnKofiSupport title/>
                <div className="mt-5">
                  <CBlockText color="secondary"
                              text={`OG-Tracker is a free tool and this will never change. All the functionality are available freely.
                              In order to thanks the supporters, a Premium membership have been created.
                              It opens the access to our data, allowing you to use much more data than the one you collect personally on Ogame.`}/>
                  <CBlockText color="secondary" text={"As a big thanks gift:"}/>
                  <CBlockBullet color="muted">
                    <div value="A premium access for EVER 🚀"/>
                    <div value="Access to activity data from lower contributors 🤖">
                      <CPopInfo title={"🤖 Activity data"}
                                body={"The data collected by lower contributors are included with the one you collect in-game."}
                                id="activityInfo"/>
                    </div>
                    <div value="Data protection against lower contributors 🛡️">
                      <CPopInfo title={"🛡️ Data protection"}
                                body={"Lower contributors don't have access to the data you collect in-game."}
                                id="protectionInfo"/>
                    </div>
                    <div value="Monthly reports"/>
                    <div value="More coming soon.."/>
                  </CBlockBullet>
                  <CBlockText className="mt-4" color="secondary"
                              text={"Please add your profile email in the field 'Your name' in Ko-Fi message, so your account will be updated automatically."}/>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {this.state.user.premium && drawPremiumDashboard()}
      </div>
    )
  }
}

export default Premium;
