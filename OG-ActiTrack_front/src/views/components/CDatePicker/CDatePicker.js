import React, {Component} from 'react';
import CDayPicker from "./CDayPicker";
import CWeekPicker from "./CWeekPicker";
import {EDatePicker} from "./EDatePicker";
import CDayInputPicker from "./CDayInputPicker";
import CWeekInputPicker from "./CWeekInputPicker";
import CDayRangePicker from "./CDayRangePicker";
import CDayRangeInputPicker from "./CDayRangeInputPicker";
import CMonthInputPicker from "./CMonthInputPicker";
import CYearInputPicker from "./CYearInputPicker";
import CQuarterInputPicker from "./CQuarterInputPicker";
import {Row, Col} from "reactstrap/es";

import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
  dateTypeSelected: PropTypes.number,
  handleDayChange: PropTypes.func,

  title: PropTypes.string,
  titleXS: PropTypes.number,
  titleSM: PropTypes.number,
  titleMD: PropTypes.number,
  titleLG: PropTypes.number,
  titleXL: PropTypes.number
};

const defaultProps = {
  dateTypeSelected: 1,
  titleXS: 12,
  titleSM: 12,
  titleMD: 12,
  titleLG: 4,
  titleXL: 4
};

class CDatePicker extends Component {
  render() {
    const {dateTypeSelected, title, className, handleDayChange, titleXS, titleSM, titleMD, titleLG, titleXL} = this.props;
    let drawDateSelection = function () {
      if (dateTypeSelected === EDatePicker.DayPicker) {
        return (<CDayPicker handleDayChange={handleDayChange}/>);
      } else if (dateTypeSelected === EDatePicker.WeekPicker) {
        return (<CWeekPicker handleDayChange={handleDayChange}/>);
      } else if (dateTypeSelected === EDatePicker.DayInputPicker) {
        return (<CDayInputPicker handleDayChange={handleDayChange}/>);
      } else if (dateTypeSelected === EDatePicker.WeekInputPicker) {
        return (<CWeekInputPicker handleDayChange={handleDayChange}/>);
      } else if (dateTypeSelected === EDatePicker.DayRangePicker) {
        return (<CDayRangePicker handleDayChange={handleDayChange}/>);
      } else if (dateTypeSelected === EDatePicker.DayRangeInputPicker) {
        return (<CDayRangeInputPicker handleDayChange={handleDayChange}/>);
      } else if (dateTypeSelected === EDatePicker.MonthInputPicker) {
        return (<CMonthInputPicker handleDayChange={handleDayChange}/>);
      } else if (dateTypeSelected === EDatePicker.QuarterInputPicker) {
        return (<CQuarterInputPicker handleDayChange={handleDayChange}/>);
      } else if (dateTypeSelected === EDatePicker.YearInputPicker) {
        return (<CYearInputPicker handleDayChange={handleDayChange}/>);
      }
    }.bind(this);

    if (title) {
      return (
        <Row className={className}>
          <Col xs={titleXS} sm={titleSM} md={titleMD} lg={titleLG} xl={titleXL}>
            <span>{title}</span>
          </Col>
          <Col xs={titleXS === 12 ? 12 : 12 - titleXS} sm={titleSM === 12 ? 12 : 12 - titleSM} md={titleMD === 12 ? 12 : 12 - titleMD} lg={titleLG === 12 ? 12 : 12 - titleLG} xl={titleXL === 12 ? 12 : 12 - titleXL}>
            {drawDateSelection()}
          </Col>
        </Row>
      )
    } else {
      return (
        <div className={className}>
          {drawDateSelection()}
        </div>
      );
    }
  }
}

CDatePicker.defaultProps = defaultProps;
CDatePicker.propTypes = propTypes;

export default CDatePicker;
