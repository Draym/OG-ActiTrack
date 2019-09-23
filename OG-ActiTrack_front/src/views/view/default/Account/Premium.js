import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';

import CBlockTitle from "../../../components/CBlockTitle/CBlockTitle";
import BtnKofiSupport from "../../../components/Widgets/buttons/BtnKofiSupport";
import CBlockText from "../../../components/CBlockText/CBlockText";
import CBlockBullet from "../../../components/CBlockText/CBlockBullet";
import CPopInfo from "../../../components/CPopup/CPopInfo";

class Premium extends Component {


  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={8}>
            <Card>
              <CardHeader>Support OG-Tracker</CardHeader>
              <CardBody>
                <BtnKofiSupport title/>
                <div className="mt-5">
                  <CBlockText muted
                    text={"To thanks you for your support, you will get hidden features from OG-Tracker:"}/>
                  <CBlockBullet muted>
                    <span value="A premium access for EVER 🚀"></span>
                    <span value="Access to activity data from lower contributors 🤖"><CPopInfo title={"hi"} body={"hi2"} id="abc"/></span>
                    <span value="Data protection against lower contributors 🛡️"></span>
                    <span value="Monthly reports"></span>
                    <span value="More coming soon.."></span>
                  </CBlockBullet>
                  <CBlockText className="mt-4" muted
                              text={"Please add your profile name, or email in the tip message, so your thanks gift will be added automatically. Else please contact me."}/>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={8}>
            <Card>
              <CardHeader>Premium Dashboard</CardHeader>
              <CardBody>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Premium;
