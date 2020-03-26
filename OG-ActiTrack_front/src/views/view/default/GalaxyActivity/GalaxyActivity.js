import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";
import ChartCreator from "../../../../utils/chart/ChartCreator";
import CSlider from "../../../components/CSlider";
import GalaxyActivityChart from "./widgets/GalaxyActivityChart";
import HttpUtils from "../../../../utils/api/HttpUtils";
import {ApiEndpoint} from "../../../../utils/api/ApiEndpoint";
import SelectServerInput from "../../../components/Widgets/inputs/select/selectData/SelectServerInput";
import CPopInfo from "../../../components/CPopup/CPopInfo";
import {EDatePicker} from "../../../components/CDatePicker/EDatePicker";
import CButtonLoading from "../../../components/CButton/CButtonLoading";
import CDatePicker from "../../../components/CDatePicker";
import UserSession from "../../../../utils/storage/UserSession";

import "react-vis/dist/style.css";
import CBoolInput from "../../../components/CBoolInput";
import PremiumStar from "../../../components/Widgets/reusable/PremiumStar";
import TLogs from "../../../../utils/TLogs";


class GalaxyActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderValue: 0,
      currentSliderDate: this.getCurrentSliderDate(0),
      formattedData: {},
      currentData: [],
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
    this.createChart = this.createChart.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleServerChange = this.handleServerChange.bind(this);
    this.handleGalaxyChange = this.handleGalaxyChange.bind(this);
    this.handleGalaxyChange = this.handleGalaxyChange.bind(this);
    this.onDateSliderChange = this.onDateSliderChange.bind(this);
    this.handleFriendDataChange = this.handleFriendDataChange.bind(this);
    this.handleGlobalDataChange = this.handleGlobalDataChange.bind(this);
    this.isParametersValid = this.isParametersValid.bind(this);
    this.generateApiEndpointForChart = this.generateApiEndpointForChart.bind(this);
  }

  generateApiEndpointForChart() {
    let parameters = {
      server: this.state.server,
      start: new Date(this.state.dateRange.first).toISOString().split("T")[0] + "T00:00:00.000",
      end: new Date(this.state.dateRange.last).toISOString().split("T")[0] + "T00:00:00.000"
    };
    if (this.state.friendData === true) {
      return {
        endpoint: ApiEndpoint.ACTIVITY_FriendGroupGalaxy,
        parameters: parameters
      };
    } else if (this.state.globalData === true) {
      return {
        endpoint: ApiEndpoint.ACTIVITY_GlobalGalaxy,
        parameters: parameters
      };
    } else {
      return {
        endpoint: ApiEndpoint.ACTIVITY_SelfGalaxy,
        parameters: parameters
      };
    }
  }

  formatChartData(flatData) {
    let result = ChartCreator.preBuildPlayerDataPerDay(flatData, 14);

    TLogs.p("1:", result);
    for (let i in result) {
      for (let i2 = 0; i2 < result[i].length; ++i2) {
        if (!result[i][i2].activity) {
          result[i].splice(i2, 1);
          --i2;
          continue;
        }
        result[i][i2].x = Number(result[i][i2].position.split(/[:;]/)[1]);
        result[i][i2].y = Number(result[i][i2].position.split(/[:;]/)[0]);
      }
    }
    TLogs.p("2:", result);
    return result;
  }

  createChart() {
    this.setState({loading: {loadChart: true}});
    let callParameters = this.generateApiEndpointForChart();

    HttpUtils.GET(null, callParameters.endpoint, callParameters.parameters, function (data) {
      if (data) {
        let formattedData = this.formatChartData(data);
        this.setState({
          formattedData: formattedData,
          currentData: formattedData[this.state.sliderValue],
          guiChart: true,
          hasChange: false,
          loading: {loadChart: false}
        });
      } else {
        this.setState({
          errorServer: "There is no data for " + callParameters.parameters.server,
          loading: {loadChart: false}
        });
      }
    }.bind(this), function (errorStatus, error) {
      TLogs.p(error);
      this.setState({
        errorServer: error,
        loading: {loadChart: false}
      });
    }.bind(this));
  }

  onDateSliderChange(value) {
    TLogs.p("slider: ", value);
    this.setState({
      sliderValue: value,
      currentSliderDate: this.getCurrentSliderDate(value),
      currentData: (this.state.formattedData[value] ? this.state.formattedData[value] : [])
    });
  }

  handleDayChange(range) {
    this.setState({
      dateRange: range, hasChange: true
    });
  };

  handleServerChange = selectedOption => {
    if (selectedOption.value)
      this.setState({
        server: selectedOption.value, hasChange: true,
        guiParameters: true
      });
  };

  handleGalaxyChange = selectedOption => {
    if (selectedOption.value)
      this.setState({
        galaxy: selectedOption.value, hasChange: true
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

  getCurrentSliderDate(sliderValue) {
    let fullTime = sliderValue * 14;
    let hour = (fullTime / 60 >> 0);
    let minutes = (fullTime % 60 >> 0);
    TLogs.p("time: ", hour + "h" + minutes);
    return hour + "h" + (minutes < 10 ? "0" + minutes : minutes);
  }

  isParametersValid() {
    console.log("date:", this.state.dateRange)
    return (this.state.server && (this.state.dateTypeSelected === EDatePicker.All || this.state.dateRange.first));
  }

  render() {
    let drawPremiumParameters = function () {
      return (
        <Card>
          <CardHeader>
            Advanced parameters:

            <div className="card-header-actions">
              <CPopInfo className="card-header-action btn" id="advancedInfo" position="bottom"
                        title="popinfo.activity.galaxy.advanced.title" body="popinfo.activity.galaxy.advanced.body"/>
            </div>
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                <span className="btn-label">Use friend data:</span>
              </Col>
              <Col xs={2} sm={2} md={2} lg={4} xl={4}>
                <CBoolInput onChange={this.handleFriendDataChange} value={this.state.friendData}/>
              </Col>
              <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                <CPopInfo className="btn-label card-header-action btn" id="friendInfo" position="bottom"
                          title="popinfo.activity.galaxy.friend.title" body="popinfo.activity.galaxy.friend.body"/>
              </Col>
            </Row>
            <Row>
              <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                <PremiumStar className="ml-2 mr-2"/><span>Use global data:</span>
              </Col>
              <Col xs={2} sm={2} md={2} lg={4} xl={4}>
                <CBoolInput onChange={this.handleGlobalDataChange} value={this.state.globalData}
                            disabled={!UserSession.getSession() || UserSession.getSession().premium}/>
              </Col>
              <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                <CPopInfo className="btn-label card-header-action btn" id="premiumInfo" position="bottom"
                          title="popinfo.activity.galaxy.premium.title" body="popinfo.activity.galaxy.premium.body"/>
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
              Choose a day:

              <div className="card-header-actions">
                <CPopInfo className="card-header-action btn" id="dateInfo" position="bottom"
                          title="popinfo.activity.galaxy.date.title" body="popinfo.activity.galaxy.date.body"/>
              </div>
            </CardHeader>
            <CardBody className="margin-bot-l5">
              <Row>
                <Col xs={12} sm={12} md={12} lg={5} xl={5}>
                  <span>Select the Date:</span>
                </Col>
                <Col xs={12} sm={12} md={12} lg={7} xl={7}>
                  <CDatePicker onChange={this.handleDayChange} dateTypeSelected={EDatePicker.DayInputPicker}/>
                </Col>
              </Row>
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
            Select a server:
            <div className="card-header-actions">
              <CPopInfo className="card-header-action btn" id="paramInfo" position="bottom"
                        title="popinfo.activity.galaxy.param.title" body="popinfo.activity.galaxy.param.body"/>
            </div>
          </CardHeader>
          <CardBody>
            <SelectServerInput className="mb-2" onChange={this.handleServerChange} error={this.state.errorServer}/>
            {/*!TString.isNull(this.state.server) && <SelectGalaxyForm onChange={this.handleGalaxyChange} server={this.state.server}/>*/}
          </CardBody>
        </Card>
      );
    }.bind(this);
    let drawChart = function () {
      if (this.state.guiChart) {
        return (
          <div>
            <GalaxyActivityChart data={this.state.currentData} width={1250} height={500}
                                 colors={['#3193b6', '#ffffff']}
                                 xRange={[0, 499]} yRange={[0, 10]}/>
            <CSlider id="galaxyDateSlider" onChange={this.onDateSliderChange} width={1250}
                     value={this.state.sliderValue} position={"bottom"}
                     sliderLabelStart="00h" sliderLabelMid="12h" sliderLabelEnd="24h"
                     sliderTipText={this.state.currentSliderDate}/>
          </div>
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

export default GalaxyActivity;
