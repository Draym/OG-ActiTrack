import React, {Component} from 'react';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col, Form, Progress,
  Row,
  Table
} from 'reactstrap';
import {Line, Bar} from "react-chartjs-2";
import ChartUtils from "../../../Utils/ChartUtils";
import ChartCreator from "../../../Utils/ChartCreator";
import CFormInput from "../../Components/CFormInput/CFormInput";
import HttpUtils from "../../../Utils/HttpUtils";
import UserSession from "../../../Utils/UserSession";
import TString from "../../../Utils/TString";

import moment from "moment";
import 'moment/locale/fr';
import 'moment/locale/en-gb';
import i18next from 'i18next';

import CDatePicker from "../../Components/CDatePicker";
import {EDatePicker} from "../../Components/CDatePicker/EDatePicker";
import CPopInfo from "../../Components/CPopover/CPopInfo";
import CBoolInput from "../../Components/CBoolInput";
import PlayerActivityChart from "./widgets/PlayerActivityChart";
import SelectServerForm from "../../Components/Widgets/forms/SelectServerForm";
import SelectPlayerForm from "../../Components/Widgets/forms/SelectPlayerForm";

class PlayerActivity extends Component {
  constructor(props) {
    super(props);

    this.onDateTypeBtnClick = this.onDateTypeBtnClick.bind(this);
    this.onGroupTypeBtnClick = this.onGroupTypeBtnClick.bind(this);
    this.handlePlayerChange = this.handlePlayerChange.bind(this);
    this.handleServerChange = this.handleServerChange.bind(this);
    this.submitChart = this.submitChart.bind(this);
    this.onPlayerValidate= this.onPlayerValidate.bind(this);
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
      hasChange: false
    };
  }

  generateApiEndpointForChart() {
    let parameters = {
      server: this.state.server,
      playerName: this.state.player,
      start: new Date(this.state.selectedDays[0]).toISOString().split("T")[0] + "T00:00:00.000",
      end: new Date(this.state.selectedDays[this.state.selectedDays.length - 1]).toISOString().split("T")[0] + "T23:59:59.999"
    };
    if (this.state.friendData === true) {
      return {
        endpoint: '/activity/friendgroup/player',
        parameters: parameters
      };
    } else if (this.state.globalData === true) {
      return {
        endpoint: '/activity/global/player',
        parameters: parameters
      };
    } else {
      return {
        endpoint: '/activity/self/player',
        parameters: parameters
      };
    }
  }

  submitChart() {
    let callParameters = this.generateApiEndpointForChart();

    HttpUtils().GET(process.env.REACT_APP_SERVER_URL, callParameters.endpoint, callParameters.parameters, function (data) {
      console.log(data);
      if (data) {
        this.setState({
          activityLogs: data,
          guiChart: true,
          hasChange: false
        });
      } else {
        this.setState({
          errorPlayer: "There is no data for " + callParameters.parameters.player + " on " + callParameters.parameters.server
        });
      }
    }.bind(this), function (errorStatus, error) {
      console.log(error);
      this.setState({
        errorPlayer: error,
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

  onPlayerValidate() {
    this.setState({guiParameters: true});
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
  }

  handleDayChange(days) {
    this.setState({
      selectedDays: days, hasChange: true
    });
  }

  handleFriendDataChange(value) {
    this.setState({
      friendData: value,
      hasChange: true
    })
  }
  ;

  handleGlobalDataChange(value) {
    this.setState({
      globalData: value,
      hasChange: true
    })
  }
  ;

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
                <CBoolInput handleChange={this.handleFriendDataChange} value={this.state.friendData}/>
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
                <CBoolInput handleChange={this.handleGlobalDataChange} value={this.state.globalData}
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
                  <CDatePicker handleDayChange={this.handleDayChange} dateTypeSelected={this.state.dateTypeSelected}/>
                </Col>
              </Row>
              <Row className="parameter-bloc">
                <Col>
                  <Button className="float-right" color="primary"
                          disabled={this.state.selectedDays.length === 0 || !this.state.hasChange}
                          onClick={this.submitChart}>Generate chart</Button>
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
            <SelectServerForm onChange={this.handleServerChange}/>
            {!TString.isNull(this.state.server) &&
            (<SelectPlayerForm onChange={this.handlePlayerChange} onValidate={this.onPlayerValidate} server={this.state.server}/>)}
          </CardBody>
        </Card>
      );
    }.bind(this);
    let drawChart = function () {
      if (this.state.guiChart) {
        return (
          <PlayerActivityChart selectedDays={this.state.selectedDays} data={this.state.activityLogs}
                               player={this.state.player} isGroup={this.state.groupTypeSelected === 1}
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
