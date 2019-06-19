import React, {Component} from 'react';

import i18next from 'i18next';
import {Card, CardBody, CardTitle, Col, Row} from "reactstrap";
import {Bar} from "react-chartjs-2";
import ChartCreator from "../../../../Utils/ChartCreator";
import ChartUtils from "../../../../Utils/ChartUtils";
import moment from "moment";

class PlayerActivityChart extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState);
    return true;
  }


  render() {

    let dateStart = moment(this.props.selectedDays[0]).locale(i18next.t("date.format")).format("DD MMMM YYYY");
    let dateEnd = moment(this.props.selectedDays[this.props.selectedDays.length - 1]).locale(i18next.t("date.format")).format("DD MMMM YYYY");

    let renderChart = function () {
      if (this.props.isGroup) {
        return (
          <Bar data={ChartCreator.GenerateDailyPlayerActivityBarChart(this.props.data, this.props.isUnique ? 15 : 5)}
               options={ChartUtils.GetDefaultLineOpt()}
               height={300}/>
        );
      } else {

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
          <div className="chart-wrapper" style={{height: 300 + 'px', marginTop: 40 + 'px'}}>
            {renderChart()}
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default PlayerActivityChart;
