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
import PlayerActivityChart from "./Widgets/PlayerActivityChart";


//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let flatData = [
  {
    position: "1:10:2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "18",
    creationDate: new Date("2019-06-12 15:00:00")
  },
  {
    position: "1:10:2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "35",
    creationDate: new Date("2019-06-12 11:16:00")
  },
  {
    position: "1:10:2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "15",
    creationDate: new Date("2019-06-12 15:30:00")
  },
  {
    position: "1:10:2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "15",
    creationDate: new Date("2019-06-12 16:00:00")
  },
  {
    position: "1:10:2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "15",
    creationDate: new Date("2019-06-12 17:08:00")
  },
  {
    position: "1:10:2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "15",
    creationDate: new Date("2019-06-12 17:30:00")
  },
  {
    position: "1:10:2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "15",
    creationDate: new Date("2019-06-12 18:00:00")
  },
  {
    position: "1:10:2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "15",
    creationDate: new Date("2019-06-12 19:00:00")
  },
  {
    position: "1:10:2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "15",
    creationDate: new Date("2019-06-12 20:00:00")
  }, {
    position: "1:10:2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "15",
    creationDate: new Date("2019-06-12 23:00:00")
  },
  {
    position: "1:10:2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "0",
    creationDate: new Date("2019-06-12 01:00:00")
  },
  {
    position: "1:10:2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "0",
    creationDate: new Date("2019-06-12 01:05:00")
  },
  {
    position: "1:10:2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "0",
    creationDate: new Date("2019-06-12 08:08:00")
  }
];


class PlayerActivity extends Component {
  constructor(props) {
    super(props);

    this.onDateTypeBtnClick = this.onDateTypeBtnClick.bind(this);
    this.onGroupTypeBtnClick = this.onGroupTypeBtnClick.bind(this);
    this.handlePlayerChange = this.handlePlayerChange.bind(this);
    this.onServerSelect = this.onServerSelect.bind(this);
    this.generateServerOptions = this.generateServerOptions.bind(this);
    this.filterServerOptions = this.filterServerOptions.bind(this);
    this.verifyPseudo = this.verifyPseudo.bind(this);
    this.submitChart = this.submitChart.bind(this);
    this.init = this.init.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleFriendDataChange = this.handleFriendDataChange.bind(this);
    this.handleGlobalDataChange = this.handleGlobalDataChange.bind(this);
    this.state = {
      servers: [],
      server: '',
      errorServer: '',
      player: '',
      errorPlayer: '',
      activityLogs: flatData,

      dateTypeSelected: EDatePicker.DayInputPicker,
      groupTypeSelected: 1,
      selectedDays: [],

      guiParameters: false,
      guiChart: false,
      friendData: true,
      globalData: false,
      hasChange: false
    };
    this.init();
  }

  init() {

  }

  generateServerOptions() {
    let servers = [];
    /*
    HttpUtils().GET(process.env.REACT_APP_SERVER_URL, '/data/availableServers', null, function (data) {
      console.log(data);
      if (data) {
        let servers = [];
        for (let i in data) {
          servers.push({value:data[i], label:data[i]});
        }
        this.setState({servers: servers});
      } else {
        this.setState({
          errorPlayer: "There is no server registered."
        });
      }
    }.bind(this), function (errorStatus, error) {
      console.log(error);
      this.setState({
        errorPlayer: error,
      });
    }.bind(this));*/

    console.log("server");
    servers.push({value: '11', label: '11'});
    servers.push({value: '22', label: '22'});
    servers.push({value: '33', label: '33'});
    this.setState({
      servers: servers
    });
  }

  verifyPseudo() {
    let parameters = {
      server: this.state.server,
      player: this.state.player
    };
    this.setState({guiParameters: true});
    /*
    HttpUtils().GET(process.env.REACT_APP_SERVER_URL, '/data/playerExistInServer', parameters, function (data) {
      console.log(data);
      if (data) {
        this.setState({guiDate: true});
      } else {
        this.setState({
          errorPlayer: "There is no data for " + parameters.player + " on " + parameters.server
        });
      }
    }.bind(this), function (errorStatus, error) {
      console.log(error);
      this.setState({
        errorPlayer: error,
      });
    }.bind(this));*/
  }

  submitChart() {
    let endpoint = '';

    let parameters = {
      server: this.state.server,
      player: this.state.player
    };
    /*
    HttpUtils().GET(process.env.REACT_APP_SERVER_URL, endpoint, parameters, function (data) {
      console.log(data);
      if (data) {
        this.setState({
          activityLogs: data,
          guiChart: true,
          hasChange: false
        });
      } else {
        this.setState({
          errorPlayer: "There is no data for " + parameters.player + " on " + parameters.server
        });
      }
    }.bind(this), function (errorStatus, error) {
      console.log(error);
      this.setState({
        errorPlayer: error,
      });
    }.bind(this));*/
    this.setState({
      guiChart: true,
      hasChange: false
    })
  }

  filterServerOptions(inputValue) {
    if (this.state.servers.length === 0)
      this.generateServerOptions();
    return this.state.servers.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
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

  onServerSelect = selectedOption => {
    if (selectedOption.value)
      this.setState({
        server: selectedOption.value, errorServer: '', hasChange: true
      });
  };

  handlePlayerChange(event) {
    this.setState({
      player: event.target.value, errorPlayer: '', hasChange: true
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
                            active={this.state.groupTypeSelected === 2}>Split</Button>
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
      if (!this.state.guiParameters) {
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
    let drawPlayerInput = function () {
      if (!TString.isNull(this.state.server)) {
        return (
          <div>
            <p className="input-title text-muted">Enter a pseudo :</p>
            <CFormInput className="input-body" gui={{headIcon: "fa fa-user-o"}} type={"text"} placeHolder={"Pseudo"}
                        value={this.state.player} onChange={this.handlePlayerChange}
                        error={this.state.errorPlayer} verify={this.verifyPseudo}/>
          </div>
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
            <p className="input-title text-muted">Select the desired Ogame server :</p>
            <CFormInput className="input-body" gui={{headIcon: "fa fa-server"}} type={"text"}
                        placeHolder={"Select a server.."} value={this.state.server} error={this.state.errorServer}
                        autoComplete={{
                          options: this.state.servers,
                          handleSelectChange: this.onServerSelect,
                          handleInputChange: this.onServerSelect,
                          filterOptions: this.filterServerOptions
                        }}/>
            {drawPlayerInput()}
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
