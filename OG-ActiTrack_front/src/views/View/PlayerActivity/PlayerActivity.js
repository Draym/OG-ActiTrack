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
import CFormVerification from "../../Components/CForms/CFormVerification";

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
    this.handleServerChange = this.handleServerChange.bind(this);
    this.onServerSelect = this.onServerSelect.bind(this);
    this.generateServerOptions = this.generateServerOptions.bind(this);
    this.filterServerOptions = this.filterServerOptions.bind(this);
    this.verifyPseudo = this.verifyPseudo.bind(this);
    this.init = this.init.bind(this);
    this.state = {
      server: '',
      servers: [],
      player: '',
      errorServer: '',
      errorPlayer: '',
      data: flatData,
      date: new Date(),
      dateTypeSelected: 1,
      groupTypeSelected: 1,
      guiDate: false,
      guiAdvanced: false
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

  verifyPseudo(callback) {
    this.setState({
      errorPlayer: 'tutu'
    })
  }

  handlePlayerChange(event) {
    this.setState({player: event.target.value, errorPlayer: ''});
  }
  handleServerChange = newValue => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({server: inputValue, errorServer: ''});
    return inputValue;
  };
  onServerSelect = selectedOption => {
    this.setState({server: selectedOption.value, errorServer: ''});
  };

  render() {

    return (
      <div className="animated fadeIn">
        <Row className="card-parameters">
          <Col sm="3" className="card-param1">
            <Card>
              <CardBody>
                <p className="input-title text-muted">Select the desired Ogame server :</p>
                <CFormVerification className="input-body" gui={{headIcon: "fa fa-server"}} type={"text"}
                                   placeHolder={"Select a server.."} autoComplete={{
                  options: this.state.servers,
                  handleSelectChange: this.onServerSelect,
                  handleInputChange: this.onServerSelect,
                  filterOptions: this.filterServerOptions
                }}
                                   value={this.state.server}
                                   error={this.state.errorServer}/>
                <p className="input-title text-muted">Enter a pseudo :</p>
                <CFormVerification className="input-body" gui={{headIcon: "fa fa-user-o"}} type={"text"} placeHolder={"Pseudo"}
                                   value={this.state.player} onChange={this.handlePlayerChange}
                                   error={this.state.errorPlayer} verify={this.verifyPseudo}/>
              </CardBody>
            </Card>
          </Col>
          <Col sm="4" className="card-param2">
            <Card>
              <CardBody>
                <Row>
                  <Col>
                    <span>Select Date Type:</span>
                    <ButtonToolbar className="float-right" aria-label="Toolbar to select the date type">
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
              </CardBody>
            </Card>
          </Col>
          <Col sm="5" className="card-param3">
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
          </Col>
        </Row>
        <Row>
          <Col>
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
          </Col>
        </Row>
      </div>
    )
  }
}

export default PlayerActivity;
