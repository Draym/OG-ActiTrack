import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap';

import BtnKofiSupport from "../../../components/Widgets/buttons/BtnKofiSupport";
import CBlockText from "../../../components/CBlockText/CBlockText";
import CBulletList from "../../../components/CBulletList/CBulletList";
import CPopInfo from "../../../components/CPopup/CPopInfo";
import UserSession from "../../../../utils/storage/UserSession";
import CTableData from "../../../components/CTable/CTableData";
import {ApiEndpoint} from "../../../../utils/api/ApiEndpoint";
import TSessionTransform from "../../../../utils/TSessionTransform";
import CBulletItem from "../../../components/CBulletList/CBulletItem";
import TLogs from "../../../../utils/TLogs";

class Premium extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: UserSession.getSession().user,
      loadingTable: false,
      errorTable: undefined,
      dataColumns: [
        {dataField: 'pseudo', text: 'Pseudo', sort: true},
        {dataField: 'profileId', text: 'Profile Identifier', sort: true},
      ]
    };
    this.isLoadingTable = this.isLoadingTable.bind(this);
  }


  /**
   * TABLE
   **/
  formatTableData(flatData) {
    let data = [];
    for (let i in flatData) {
      let profileInfo = TSessionTransform.getInfoFromProfileId(flatData[i].friendProfileIdentifier);
      data.push({
        id: flatData[i].friendId,
        pseudo: profileInfo.pseudo,
        profileId: flatData[i].friendProfileIdentifier,
      });
    }
    return data;
  }

  isLoadingTable(value, error) {
    TLogs.p("loading table:", value);
    this.setState({
      loadingTable: value,
      errorTable: error
    });
  }

  render() {
    let drawPremiumDashboard = function () {
      return (
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={10}>
            <Card>
              <CardHeader>Premium Dashboard</CardHeader>
              <CardBody>
                <CTableData key={this.state.reload} hasSearch hasPagination
                            dataColumns={this.state.dataColumns} formatData={this.formatTableData}
                            formatter={(row) => {
                              return row.pseudo
                            }}
                            endpoint={ApiEndpoint.USER_Payment_GetAll} loadOnStart={true} loading={this.isLoadingTable}
                            advertEmpty="There is no donation associated to your account."/>
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
                <div className="mt-5 ml-md-4">
                  <CBlockText color="secondary"
                              text={`OG-Tracker is a free of charge with no advertisement. All the functionality are available freely and this will never change.
                              Your donations support the cost of the server & domain name.`}/>
                  <CBlockText color="secondary" text={`In order to thanks the supporters, a Premium membership have been created.
                              It opens the access to our data, allowing you to use much more data than the one you collect personally on Ogame.`}/>
                  <CBlockText color="secondary" text={"As a big thanks gift:"}/>
                  <CBulletList color="muted">
                    <CBulletItem>A premium access for EVER 🚀</CBulletItem>
                    <CBulletItem>
                      Access to activity data from lower contributors 🤖
                      <CPopInfo className="ml-sm-1 ml-md-3 mr-sm-2 mr-md-3" title={"🤖 Activity data"}
                                body={"The data collected by lower contributors are included with the one you collect in-game."}
                                id="activityInfo"/>
                    </CBulletItem>
                    <CBulletItem>Data protection against lower contributors 🛡️
                      <CPopInfo className="ml-sm-1 ml-md-3 mr-sm-2 mr-md-3" title={"🛡️ Data protection"}
                                body={"Lower contributors don't have access to the data you collect in-game."}
                                id="protectionInfo"/>
                    </CBulletItem>
                    <CBulletItem>More coming soon..</CBulletItem>
                  </CBulletList>
                  <CBlockText className="mt-4" color="secondary"
                              text={"Please add your profile email in the field 'Your name' in Ko-Fi message, so your account will be updated automatically."}/>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {UserSession.isPremium() && drawPremiumDashboard()}
      </div>
    )
  }
}

export default Premium;
