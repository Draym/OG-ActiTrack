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
import HttpUtils from "../../../../Utils/api/HttpUtils";
import UserSession from "../../../../Utils/UserSession";
import TString from "../../../../Utils/TString";

import 'moment/locale/fr';
import 'moment/locale/en-gb';

import CDatePicker from "../../../Components/CDatePicker";
import {EDatePicker} from "../../../Components/CDatePicker/EDatePicker";
import CPopInfo from "../../../Components/CPopover/CPopInfo";
import CBoolInput from "../../../Components/CBoolInput";
import PlayerActivityChart from "./widgets/PlayerActivityChart";
import SelectServerForm from "../../../Components/Widgets/forms/SelectServerForm";
import SelectPlayerForm from "../../../Components/Widgets/forms/SelectPlayerForm";
import {ApiEndpoint} from "../../../../Utils/api/ApiEndpoint";
import CButtonLoading from "../../../Components/CButton/CButtonLoading";

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
    this.generateApiEndpointForChart = this.generateApiEndpointForChart.bind(this);
    this.state = {
      server: '',
      player: '',
      activityLogs: [],

      dateTypeSelected: EDatePicker.DayInputPicker,
      groupTypeSelected: 1,
      selectedDays: [],

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
    console.log("Generate chart for ", this.state.player);
    let parameters = {
      server: this.state.server,
      playerId: this.state.player.playerId,
      start: new Date(this.state.selectedDays[0]).toISOString().split("T")[0] + "T00:00:00.000",
      end: new Date(this.state.selectedDays[this.state.selectedDays.length - 1]).toISOString().split("T")[0] + "T23:59:59.999"
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

    HttpUtils().GET(process.env.REACT_APP_SERVER_URL, callParameters.endpoint, callParameters.parameters, function (data) {
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
      console.log(error);
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

  onPlayerValidate(state) {
    this.setState({guiParameters: state});
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

  handleDayChange(days) {
    this.setState({
      selectedDays: days, hasChange: true
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
              <Col md={5}>
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
              <Col md={5}>
                <span className="btn-label">Use friend data:</span>
              </Col>
              <Col md={4}>
                <CBoolInput onChange={this.handleFriendDataChange} value={this.state.friendData}/>
              </Col>
              <Col md={2}>
                <CPopInfo className="btn-label card-header-action btn" id="friendInfo" position="bottom"
                          title="popinfo.activity.player.friend.title" body="popinfo.activity.player.friend.body"/>
              </Col>
            </Row>
            <Row>
              <Col md={1}>
                <i className="btn-label fa fa-star"
                   style={{color: '#ffe200'}}/>
              </Col>
              <Col className="padding-off" md={4}>
                <span className="btn-label">Use global data:</span>
              </Col>
              <Col md={4}>
                <CBoolInput onChange={this.handleGlobalDataChange} value={this.state.globalData}
                            disabled={!UserSession.getSession() || UserSession.getSession().premium}/>
              </Col>
              <Col md={2}>
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
                <Col md={5}>
                  <span className="btn-label">Select the Range:</span>
                </Col>
                <Col md={7}>
                  <ButtonToolbar aria-label="Toolbar to select the date type">
                    <ButtonGroup className="mr-3" aria-label="First group">
                      <Button color="outline-primary"
                              onClick={() => this.onDateTypeBtnClick(EDatePicker.DayInputPicker)}
                              active={this.state.dateTypeSelected === EDatePicker.DayInputPicker}>Day</Button>
                      <Button color="outline-primary"
                              onClick={() => this.onDateTypeBtnClick(EDatePicker.WeekInputPicker)}
                              active={this.state.dateTypeSelected === EDatePicker.WeekInputPicker}>Week</Button>
                    </ButtonGroup>
                  </ButtonToolbar>
                </Col>
              </Row>
              <Row className="parameter-bloc">
                <Col md={5}>
                  <span>Select the Date:</span>
                </Col>
                <Col md={7}>
                  <CDatePicker onChange={this.handleDayChange} dateTypeSelected={this.state.dateTypeSelected}/>
                </Col>
              </Row>
              <Row className="parameter-bloc">
                <Col>
                  <CButtonLoading color="primary"
                                  onClick={this.createChart}
                                  loading={this.state.loading.loadChart}
                                  disabled={this.state.selectedDays.length === 0 || !this.state.hasChange}
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
            <SelectServerForm className="mb-3" onChange={this.handleServerChange}/>
            {!TString.isNull(this.state.server) &&
            (<SelectPlayerForm onChange={this.handlePlayerChange} onValidate={this.onPlayerValidate}
                               server={this.state.server} error={this.state.errorPlayer}/>)}
          </CardBody>
        </Card>
      );
    }.bind(this);
    let drawChart = function () {
      if (this.state.guiChart) {
        return (
          <PlayerActivityChart selectedDays={this.state.selectedDays} data={this.state.activityLogs}
                               player={this.state.player.playerName} isGroup={this.state.groupTypeSelected === 1}
                               isUnique={!this.state.globalData && !this.state.friendData}/>
        );
      }
    }.bind(this);
    return (
      <div className="animated fadeIn">
        <Row className="card-parameters">
          <Col sm="4" className="card-param1">
            {drawPlayerParameter()}
          </Col>
          <Col sm="4" className="card-param2">
            {drawParameters()}
          </Col>
          <Col sm="4" className="card-param3">
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
