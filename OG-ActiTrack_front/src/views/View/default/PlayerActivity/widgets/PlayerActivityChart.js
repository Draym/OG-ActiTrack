import React, {Component} from 'react';

import i18next from 'i18next';
import {Card, CardBody, CardTitle, Col, Row} from "reactstrap";
import {Bar, Line} from "react-chartjs-2";
import ChartCreator from "../../../../../Utils/chart/ChartCreator";
import ChartUtils from "../../../../../Utils/chart/ChartUtils";
import moment from "moment";

class PlayerActivityChart extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isGroup !== this.props.isGroup)
      return true;
    if (nextProps.data !== this.props.data)
      return true;
    return false;
  }


  render() {

    let dateStart = moment(this.props.selectedDays[0]).locale(i18next.t("date.format")).format("DD MMMM YYYY");
    let dateEnd = moment(this.props.selectedDays[this.props.selectedDays.length - 1]).locale(i18next.t("date.format")).format("DD MMMM YYYY");

    let renderChart = function () {
      if (this.props.selectedDays.length === 1) {
        if (this.props.isGroup) {
          let dataResults = ChartCreator.GeneratePlayerActivityPerDay(this.props.data, this.props.isUnique ? 15 : 5, ["Planet with activity", "Planet without activity"]);
          return (
            <div className="chart-wrapper" style={{height: 300 + 'px', marginTop: 40 + 'px'}}>
              <Bar data={dataResults[0]}
                   options={ChartUtils.GetDefaultChartOpt(36, 1)}
                   height={300}/>
            </div>
          );
        } else {
          let dataResults = ChartCreator.GeneratePlayerActivityPerDayPerPosition(this.props.data, this.props.isUnique ? 15 : 5, ["Has activity", "No activity"]);
          return (
            <div className="chart-wrapper" style={{height: (dataResults.length * 150) + 'px', marginTop: 40 + 'px'}}>
              {
                dataResults.map((data, key) =>
                  <Row key={key}>
                    <Line key={key} data={data}
                          options={ChartUtils.GetDefaultChartOpt(14, 1)}
                          height={150}/>
                  </Row>)
              }
            </div>
          );
        }
      } else {
        if (this.props.isGroup) {
          let dataResults = ChartCreator.GeneratePlayerActivityPerWeek(this.props.data, this.props.isUnique ? 12 : 6, ["% d'activité"]);
          return (
            <div className="chart-wrapper" style={{height: 300 + 'px', marginTop: 40 + 'px'}}>
              <Bar data={dataResults[0]}
                   options={ChartUtils.GetDefaultChartOpt(20, 25)}
                   height={300}/>
            </div>
          );
        } else {
          let dataResults = ChartCreator.GeneratePlayerActivityPerWeekSplit(this.props.data, this.props.isUnique ? 15 : 5, ["Has activity", "No activity"]);
          console.log("dataResults: ", dataResults);
          return (
            <div className="chart-wrapper" style={{height: (dataResults.length * 150) + 'px', marginTop: 40 + 'px'}}>
              {
                dataResults.map((data, key) =>
                  <Row key={key}>
                    <Bar key={key} data={data}
                         options={ChartUtils.GetDefaultChartOpt(36, 1)}
                         height={150}/>
                  </Row>)
              }
            </div>
          );
        }
      }
    }.bind(this);
    return (
      <Card>
        <CardBody>
          <Row>
            <Col sm="5">
              <CardTitle className="mb-0">Activity of {this.props.player}:</CardTitle>
              <div
                className="small text-muted">For {dateStart} {this.props.selectedDays.length === 1 ? '' : ' to ' + dateEnd}</div>
            </Col>
          </Row>
          {renderChart()}
        </CardBody>
      </Card>
    );
  }
}

export default PlayerActivityChart;
