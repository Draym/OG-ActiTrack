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
import CFormInput from "../../Components/CForms/CFormInput";
import HttpUtils from "../../../Utils/HttpUtils";
import UserSession from "../../../Utils/UserSession";
import TString from "../../../Utils/TString";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';

import 'moment/locale/fr';
import 'moment/locale/en-gb';
import i18next from 'i18next';
import moment from "moment";


//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let flatData = [
  {
    planetPos: "1:10:2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "18",
    creationDate: new Date("2019-06-12 15:00:00")
  },
  {
    planetPos: "1:10:2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "35",
    creationDate: new Date("2019-06-12 11:16:00")
  },
  {
    planetPos: "1:10:2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "15",
    creationDate: new Date("2019-06-12 15:30:00")
  },
  {
    planetPos: "1:10:2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "15",
    creationDate: new Date("2019-06-12 16:00:00")
  },
  {
    planetPos: "1:10:2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "15",
    creationDate: new Date("2019-06-12 17:08:00")
  },
  {
    planetPos: "1:10:2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "15",
    creationDate: new Date("2019-06-12 17:30:00")
  },
  {
    planetPos: "1:10:2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "15",
    creationDate: new Date("2019-06-12 18:00:00")
  },
  {
    planetPos: "1:10:2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "15",
    creationDate: new Date("2019-06-12 19:00:00")
  },
  {
    planetPos: "1:10:2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "15",
    creationDate: new Date("2019-06-12 20:00:00")
  }, {
    planetPos: "1:10:2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "15",
    creationDate: new Date("2019-06-12 23:00:00")
  },
  {
    planetPos: "1:10:2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "0",
    creationDate: new Date("2019-06-12 01:00:00")
  },
  {
    planetPos: "1:10:2",
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
    this.drawAdvanced = this.drawAdvanced.bind(this);
    this.submitChart = this.submitChart.bind(this);
    this.init = this.init.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.state = {
      servers: [],
      server: '',
      errorServer: '',
      player: '',
      errorPlayer: '',
      data: flatData,
      dateTypeSelected: 1,
      groupTypeSelected: 1,
      guiDate: false,
      guiAdvanced: false,
      guiChart: false,
      selectedDay: moment(),
    };
    this.init();
  }

  init() {

  }

  generateServerOptions() {
    let servers = [];

    console.log("server");
    servers.push({value: '11', label: '11'});
    servers.push({value: '22', label: '22'});
    servers.push({value: '33', label: '33'});
    this.setState({
      servers: servers
    });
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
    });
  }

  onGroupTypeBtnClick(radioSelected) {
    this.setState({
      groupTypeSelected: radioSelected,
    });
  }

  verifyPseudo() {
    let parameters = {
      server: this.state.server,
      player: this.state.player
    };
    this.setState({guiDate: true});
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

  handlePlayerChange(event) {
    this.setState({player: event.target.value, errorPlayer: ''});
  }

  handleDayChange(day) {
    console.log("day:", day);
    this.setState({selectedDay: day});
  }

  onServerSelect = selectedOption => {
    if (selectedOption.value)
      this.setState({server: selectedOption.value, errorServer: ''});
  };

  submitChart() {
    this.setState({
      guiChart: true
    })
  }

  drawAdvanced() {
    this.setState({
      guiAdvanced: true
    })
  }

  render() {
    let drawDateSelection = function () {
      if (this.state.dateTypeSelected === 1) {
        return (
          <DayPickerInput
            formatDate={formatDate}
            parseDate={parseDate}
            format="LL"
            placeholder={`${formatDate(new Date(), 'LL', i18next.t('date.format'))}`}
            dayPickerProps={{
              locale: i18next.t('date.format'),
              localeUtils: MomentLocaleUtils,
            }}
            onDayChange={this.handleDayChange}
          />
        );
      } else if (this.state.dateTypeSelected === 2) {
        return (
          <DayPickerInput
            formatDate={formatDate}
            parseDate={parseDate}
            format="LL"
            placeholder={`${formatDate(new Date(), 'LL', i18next.t('date.format'))}`}
            dayPickerProps={{
              locale: i18next.t('date.format'),
              localeUtils: MomentLocaleUtils,
            }}
            onDayChange={this.handleDayChange}
          />
        );
      } else if (this.state.dateTypeSelected === 2) {
        return (
          <DayPickerInput
            formatDate={formatDate}
            parseDate={parseDate}
            format="LL"
            placeholder={`${formatDate(new Date(), 'LL', i18next.t('date.format'))}`}
            dayPickerProps={{
              locale: i18next.t('date.format'),
              localeUtils: MomentLocaleUtils,
            }}
            onDayChange={this.handleDayChange}
          />
        );
      }
    };
    let drawDateParameters = function () {
      if (!this.state.guiDate) {
        return (
          <Card>
            <CardBody>
              <Row>
                <Col md={5}>
                  <span className="btn-label">Select the Range:</span>
                </Col>
                <Col md={7}>
                  <ButtonToolbar aria-label="Toolbar to select the date type">
                    <ButtonGroup className="mr-3" aria-label="First group">
                      <Button color="outline-primary" onClick={() => this.onDateTypeBtnClick(1)}
                              active={this.state.dateTypeSelected === 1}>Day</Button>
                      <Button color="outline-primary" onClick={() => this.onDateTypeBtnClick(2)}
                              active={this.state.dateTypeSelected === 2}>Month</Button>
                      <Button color="outline-primary" onClick={() => this.onDateTypeBtnClick(3)}
                              active={this.state.dateTypeSelected === 3}>Year</Button>
                    </ButtonGroup>
                  </ButtonToolbar>
                </Col>
              </Row>
              <Row className="parameter-bloc">
                <Col md={5}>
                  <span className="btn-label">Select the Date:</span>
                </Col>
                <Col md={7}>
                  {drawDateSelection()}
                </Col>
              </Row>
              <Row className="parameter-bloc">
                <Col>
                  <Button className="float-right" color="primary" disabled={!this.state.selectedDay}
                          onClick={this.submitChart}>Generate chart</Button>
                  <Button className="float-right" style={{marginRight: 10 + 'px'}} color="secondary"
                          onClick={this.drawAdvanced}>Advanced parameters</Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        );
      }
    }.bind(this);
    let drawAdvancedParameters = function () {
      if (this.state.guiAdvanced) {
        return (
          <Card>
            <CardBody>
              <Col sm="7" className="d-none d-sm-inline-block">
                <ButtonToolbar className="float-right" aria-label="Toolbar to select the group type">
                  <ButtonGroup className="mr-3" aria-label="First group">
                    <Button color="outline-primary" onClick={() => this.onGroupTypeBtnClick(1)}
                            active={this.state.groupTypeSelected === 1}>Group</Button>
                    <Button color="outline-primary" onClick={() => this.onGroupTypeBtnClick(2)}
                            active={this.state.groupTypeSelected === 2}>Split</Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </Col>
            </CardBody>
          </Card>
        );
      }
    }.bind(this);
    let drawChart = function () {
      if (this.state.guiChart) {
        return (
          <Card>
            <CardBody>
              <Row>
                <Col sm="5">
                  <CardTitle className="mb-0">Traffic</CardTitle>
                  <div className="small text-muted">November 2015</div>
                </Col>
              </Row>
              <div className="chart-wrapper" style={{height: 300 + 'px', marginTop: 40 + 'px'}}>
                <Bar data={ChartCreator.GenerateDailyPlayerActivityChart(this.state.data)}
                     options={ChartUtils.GetDefaultLineOpt()}
                     height={300}/>
              </div>
            </CardBody>
          </Card>
        )
      }
    }.bind(this);
    let drawPlayerParameter = function () {
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
    return (
      <div className="animated fadeIn">
        <Row className="card-parameters">
          <Col sm="3" className="card-param1">
            <Card>
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
                {drawPlayerParameter()}
              </CardBody>
            </Card>
          </Col>
          <Col sm="4" className="card-param2">
            {drawDateParameters()}
          </Col>
          <Col sm="5" className="card-param3">
            {drawAdvancedParameters()}
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
