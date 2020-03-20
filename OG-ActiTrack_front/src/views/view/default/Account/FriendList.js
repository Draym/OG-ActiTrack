import React, {Component} from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  FormFeedback, Form
} from 'reactstrap';
import UserSession from "../../../../utils/storage/UserSession";
import TSessionTransform from "../../../../utils/TSessionTransform";
import CTableData from "../../../components/CTable/CTableData";
import {ApiEndpoint} from "../../../../utils/api/ApiEndpoint";
import HttpUtils from "../../../../utils/api/HttpUtils";
import moment from "moment";
import CBlockTitle from "../../../components/CBlockTitle/CBlockTitle";
import TLogs from "../../../../utils/TLogs";

class FriendList extends Component {
  constructor(props) {
    super(props);
    const session = UserSession.getSession();
    this.state = {
      inputFriendId: "",
      profileId: TSessionTransform.getProfileId(session),
      loadingInput: false,
      loadingTable: false,
      errorInput: undefined,
      errorTable: undefined,
      reload: undefined,
      dataColumns: [
        {dataField: 'pseudo', text: 'Pseudo', sort: true},
        {dataField: 'profileId', text: 'Profile Identifier', sort: true},
      ]
    };
    this.isLoadingInput = this.isLoadingInput.bind(this);
    this.isLoadingTable = this.isLoadingTable.bind(this);
    this.onAddFriend = this.onAddFriend.bind(this);
    this.onDeleteFriend = this.onDeleteFriend.bind(this);
    this.onFriendIdChange = this.onFriendIdChange.bind(this);
  }

  /**
   * INPUT
   **/
  onFriendIdChange(event) {
    this.setState({inputFriendId: event.target.value});
  }

  onAddFriend() {
    this.isLoadingInput(true);
    const data = TSessionTransform.getInfoFromProfileId(this.state.inputFriendId);
    if (!data) {
      this.isLoadingInput(false, "The profile identifier is incorrect.");
    }
    HttpUtils.POST(null, ApiEndpoint.FRIEND_Add, data, function () {
      this.setState({reload: moment().format('HH:mm:ss')});
      this.isLoadingInput(false);
    }.bind(this), function (errorStatus, error) {
      this.isLoadingInput(false, error);
    }.bind(this));
  }

  isLoadingInput(value, error) {
    TLogs.p("loadingInput:", value);
    this.setState({
      loadingInput: value,
      errorInput: error
    });
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
    this.setState({
      loadingTable: value,
      errorTable: error
    });
  }

  onDeleteFriend(row, rowIndex, callback) {
    this.isLoadingTable(true);
    HttpUtils.DELETE(null, ApiEndpoint.FRIEND_Delete, TSessionTransform.getInfoFromProfileId(row.profileId), function () {
      this.isLoadingTable(false);
      callback();
    }.bind(this), function (errorStatus, error) {
      this.isLoadingTable(false, error);
    }.bind(this));
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={8}>
            <Card>
              <CardHeader>Profile Identifier</CardHeader>
              <CardBody>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={10} xl={6}>
                    <h4>Your identifier is : <span className="code-highlight font-xl">{this.state.profileId}</span></h4>

                    <CBlockTitle text={"Share this code to your friend to let them add you to their friend list."}/>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={8}>
            <Card>
              <CardHeader>Friend Management</CardHeader>
              <CardBody>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={10} xl={6}>
                    <CBlockTitle text={"Add a friend:"} head/>
                    <InputGroup>
                      <Input type="text" invalid={!!this.state.errorInput}
                             placeholder="type your friend profile's Identifier"
                             value={this.state.inputFriendId}
                             onChange={this.onFriendIdChange}/>
                      <InputGroupAddon addonType="append">
                        <Button onClick={this.onAddFriend}
                                disabled={this.state.loadingInput || this.state.loadingTable}>Add friend</Button>
                      </InputGroupAddon>
                      {this.state.errorInput && <FormFeedback>{this.state.errorInput}</FormFeedback>}
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="mt-5">
                  <Col>
                    <CTableData key={this.state.reload} hasSearch hasPagination
                                dataColumns={this.state.dataColumns} formatData={this.formatTableData}
                                endpoint={ApiEndpoint.FRIEND_Get_All} loadOnStart={true} loading={this.isLoadingTable}
                                onDeleteBtn={this.onDeleteFriend}
                                advertEmpty="You have no friend yet. Add some new friends using the form at the top."/>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default FriendList;
