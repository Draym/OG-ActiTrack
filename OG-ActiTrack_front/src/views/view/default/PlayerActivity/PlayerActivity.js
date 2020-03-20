import React, {Component} from 'react';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardHeader,
  Col, InputGroup,
  Row
} from 'reactstrap';
import HttpUtils from "../../../../utils/api/HttpUtils";
import UserSession from "../../../../utils/storage/UserSession";
import TString from "../../../../utils/TString";

import 'moment/locale/fr';
import 'moment/locale/en-gb';

import CDatePicker from "../../../components/CDatePicker";
import {EDatePicker} from "../../../components/CDatePicker/EDatePicker";
import CPopInfo from "../../../components/CPopup/CPopInfo";
import CBoolInput from "../../../components/CBoolInput";
import PlayerActivityChart from "./widgets/PlayerActivityChart";
import SelectServerInput from "../../../components/Widgets/inputs/select/SelectServerInput";
import SearchPlayerInput from "../../../components/Widgets/inputs/search/SearchPlayerInput";
import {ApiEndpoint} from "../../../../utils/api/ApiEndpoint";
import CButtonLoading from "../../../components/CButton/CButtonLoading";
import DateTypeSelector from "../../../components/Widgets/selector/DateTypeSelector";
import PremiumStar from "../../../components/Widgets/reusable/PremiumStar";
import TLogs from "../../../../utils/TLogs";

class PlayerActivity extends Component {
  constructor(props) {
    super(props);

    this.onDateTypeBtnClick = this.onDateTypeBtnClick.bind(this);
    this.onGroupTypeBtnClick = this.onGroupTypeBtnClick.bind(this);
    this.handlePlayerChange = this.handlePlayerChange.bind(this);
    this.handleServerChange = this.handleServerChange.bind(this);
    this.createChart = this.createChart.bind(this);
    this.onPlayerValidate = this.onPlayerValidate.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleFriendDataChange = this.handleFriendDataChange.bind(this);
    this.handleGlobalDataChange = this.handleGlobalDataChange.bind(this);
    this.isParametersValid = this.isParametersValid.bind(this);
    this.generateApiEndpointForChart = this.generateApiEndpointForChart.bind(this);
    this.state = {
      server: '',
      player: '',
      activityLogs: [],

      dateTypeSelected: EDatePicker.DayInputPicker,
      groupTypeSelected: 1,
      dateRange: {},

      guiParameters: false,
      guiChart: false,
      friendData: false,
      globalData: false,
      hasChange: false,

      loading: {
        loadChart: false
      }
    };
  }

  generateApiEndpointForChart() {
    TLogs.p("Generate chart for ", this.state.player);
    let parameters = {
      server: this.state.server,
      playerId: this.state.player.id,
      start: new Date(this.state.dateRange.first).toISOString().split("T")[0] + "T00:00:00.000",
      end: new Date(this.state.dateRange.last).toISOString().split("T")[0] + "T00:00:00.000"
    };
    if (this.state.friendData === true) {
      return {
        endpoint: ApiEndpoint.ACTIVITY_FriendGroupPlayer,
        parameters: parameters
      };
    } else if (this.state.globalData === true) {
      return {
        endpoint: ApiEndpoint.ACTIVITY_GlobalPlayer,
        parameters: parameters
      };
    } else {
      return {
        endpoint: ApiEndpoint.ACTIVITY_SelfPlayer,
        parameters: parameters
      };
    }
  }

  createChart() {
    this.setState({loading: {loadChart: true}});
    let callParameters = this.generateApiEndpointForChart();

    HttpUtils.GET(null, callParameters.endpoint, callParameters.parameters, function (data) {
      if (data) {
        this.setState({
          activityLogs: data,
          guiChart: true,
          hasChange: false,
          loading: {loadChart: false}
        });
      } else {
        this.setState({
          errorPlayer: "There is no data for " + callParameters.parameters.player + " on " + callParameters.parameters.server,
          loading: {loadChart: false}
        });
      }
    }.bind(this), function (errorStatus, error) {
      TLogs.p(error);
      this.setState({
        errorPlayer: error,
        loading: {loadChart: false}
      });
    }.bind(this));
  }

  onDateTypeBtnClick(radioSelected) {
    this.setState({
      dateTypeSelected: radioSelected,
      hasChange: true
    });
  }

  onGroupTypeBtnClick(radioSelected) {
    this.setState({
      groupTypeSelected: radioSelected,
      hasChange: true
    });
  }

  onPlayerValidate(status) {
    this.setState({guiParameters: status});
  }

  handleServerChange = selectedOption => {
    if (selectedOption.value)
      this.setState({
        server: selectedOption.value, hasChange: true
      });
  };

  handlePlayerChange(value) {
    this.setState({
      player: value, hasChange: true
    });
  };

  handleDayChange(range) {
    this.setState({
      dateRange: range,
      hasChange: true
    });
  };

  handleFriendDataChange(value) {
    this.setState({
      friendData: value,
      hasChange: true
    })
  };

  handleGlobalDataChange(value) {
    this.setState({
      globalData: value,
      hasChange: true
    })
  };

  isParametersValid() {
    return (this.state.server && this.state.player && (this.state.dateTypeSelected === EDatePicker.All || this.state.dateRange.first));
  }


  render() {
    let drawPremiumParameters = function () {
      return (
        <Card>
          <CardHeader>
            Advanced parameters:

            <div className="card-header-actions">
              <CPopInfo className="card-header-action btn" id="advancedInfo" position="bottom"
                        title="popinfo.activity.player.advanced.title" body="popinfo.activity.player.advanced.body"/>
            </div>
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs={12} sm={12} md={5} lg={5} xl={5}>
                <span className="btn-label">Group the data:</span>
              </Col>
              <Col sm="7">
                <ButtonToolbar>
                  <ButtonGroup className="mr-3">
                    <Button color="outline-primary" onClick={() => this.onGroupTypeBtnClick(1)}
                            active={this.state.groupTypeSelected === 1}>Group</Button>
                    <Button color="outline-primary" onClick={() => this.onGroupTypeBtnClick(2)}
                            active={this.state.groupTypeSelected === 2}>{this.state.dateTypeSelected === EDatePicker.DayInputPicker ? "Per Position" : "Per Day"}</Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </Col>
            </Row>
            <Row className="box-delim">
              <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                <span className="btn-label">Use friend data:</span>
              </Col>
              <Col xs={2} sm={2} md={2} lg={4} xl={4}>
                <CBoolInput onChange={this.handleFriendDataChange} value={this.state.friendData}/>
              </Col>
              <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                <CPopInfo className="btn-label card-header-action btn" id="friendInfo" position="bottom"
                          title="popinfo.activity.player.friend.title" body="popinfo.activity.player.friend.body"/>
              </Col>
            </Row>
            <Row>
              <Col className="padding-off" xs={5} sm={5} md={5} lg={5} xl={5}>
                <PremiumStar className="ml-2 mr-2"/><span>Use global data:</span>
              </Col>
              <Col xs={2} sm={2} md={2} lg={4} xl={4}>
                <CBoolInput onChange={this.handleGlobalDataChange} value={this.state.globalData}
                            disabled={!UserSession.getSession() || UserSession.getSession().premium}/>
              </Col>
              <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                <CPopInfo className="btn-label card-header-action btn" id="premiumInfo" position="bottom"
                          title="popinfo.activity.player.premium.title" body="popinfo.activity.player.premium.body"/>
              </Col>
            </Row>
          </CardBody>
        </Card>
      );
    }.bind(this);

    let drawParameters = function () {
      if (this.state.guiParameters) {
        return (
          <Card>
            <CardHeader>
              Choose a date range:

              <div className="card-header-actions">
                <CPopInfo className="card-header-action btn" id="dateInfo" position="bottom"
                          title="popinfo.activity.player.date.title" body="popinfo.activity.player.date.body"/>
              </div>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs={12} sm={12} md={12} lg={5} xl={5}>
                  <span className="btn-label">Select the Range:</span>
                </Col>
                <Col xs={12} sm={12} md={12} lg={7} xl={7}>
                  <DateTypeSelector onChange={this.onDateTypeBtnClick} default={this.state.dateTypeSelected}/>
                </Col>
              </Row>
              {this.state.dateTypeSelected !== EDatePicker.All &&
              <Row className="parameter-bloc">
                <Col xs={12} sm={12} md={12} lg={5} xl={5} className="pt-1 mb-2">
                  <span>Select the Date:</span>
                </Col>
                <Col xs={12} sm={12} md={12} lg={7} xl={7}>
                  <CDatePicker handleDayChange={this.handleDayChange} dateTypeSelected={this.state.dateTypeSelected}/>
                </Col>
              </Row>
              }
              <Row className="parameter-bloc">
                <Col>
                  <CButtonLoading color="primary"
                                  onClick={this.createChart}
                                  loading={this.state.loading.loadChart}
                                  disabled={!this.isParametersValid() || !this.state.hasChange}
                                  className="float-right"
                                  text="Generate chart"
                                  loadingText="Generating chart"/>
                </Col>
              </Row>
            </CardBody>
          </Card>
        );
      }
    }.bind(this);
    let drawPlayerParameter = function () {
      return (
        <Card>
          <CardHeader>
            Select a server & player:
            <div className="card-header-actions">
              <CPopInfo className="card-header-action btn" id="paramInfo" position="bottom"
                        title="popinfo.activity.player.param.title" body="popinfo.activity.player.param.body"/>
            </div>
          </CardHeader>
          <CardBody>
            <SelectServerInput className="mb-3" onChange={this.handleServerChange}/>
            {!TString.isNull(this.state.server) &&
            (<SearchPlayerInput onChange={this.handlePlayerChange} onValidate={this.onPlayerValidate}
                                apiParameter={{serverName: this.state.server}} error={this.state.errorPlayer}/>)}
          </CardBody>
        </Card>
      );
    }.bind(this);
    let drawChart = function () {
      if (this.state.guiChart) {
        return (
          <PlayerActivityChart dateRange={this.state.dateRange} data={this.state.activityLogs}
                               player={this.state.player.playerName} isGroup={this.state.groupTypeSelected === 1}
                               isUnique={!this.state.globalData && !this.state.friendData}/>
        );
      }
    }.bind(this);
    return (
      <div className="animated fadeIn">
        <Row className="card-parameters">
          <Col xs={12} sm={12} md={12} lg={12} xl={4} className="card-param1">
            {drawPlayerParameter()}
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={4} className="card-param2">
            {drawParameters()}
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={4} className="card-param3">
            {drawPremiumParameters()}
          </Col>
        </Row>
        <Row>
          <Col>
            {drawChart()}
          </Col>
        </Row>
      </div>
    )
  }
}

export default PlayerActivity;
