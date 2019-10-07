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

import PropTypes from 'prop-types';
import CBlockTitle from "../CBlockTitle/CBlockTitle";

const propTypes = {
  title: PropTypes.string,
  dateTypeSelected: PropTypes.number,
  handleDayChange: PropTypes.func
};

const defaultProps = {
  dateTypeSelected: 1
};

class CDatePicker extends Component {
  render() {
    const {dateTypeSelected} = this.props;
    let drawDateSelection = function () {
      if (dateTypeSelected === EDatePicker.DayPicker) {
        return (<CDayPicker handleDayChange={this.props.handleDayChange}/>);
      } else if (dateTypeSelected === EDatePicker.WeekPicker) {
        return (<CWeekPicker handleDayChange={this.props.handleDayChange}/>);
      } else if (dateTypeSelected === EDatePicker.DayInputPicker) {
        return (<CDayInputPicker handleDayChange={this.props.handleDayChange}/>);
      } else if (dateTypeSelected === EDatePicker.WeekInputPicker) {
        return (<CWeekInputPicker handleDayChange={this.props.handleDayChange}/>);
      } else if (dateTypeSelected === EDatePicker.DayRangePicker) {
        return (<CDayRangePicker handleDayChange={this.props.handleDayChange}/>);
      } else if (dateTypeSelected === EDatePicker.DayRangeInputPicker) {
        return (<CDayRangeInputPicker handleDayChange={this.props.handleDayChange}/>);
      } else if (dateTypeSelected === EDatePicker.MonthInputPicker) {
        return (<CMonthInputPicker handleDayChange={this.props.handleDayChange}/>);
      } else if (dateTypeSelected === EDatePicker.QuarterInputPicker) {
        return (<CQuarterInputPicker handleDayChange={this.props.handleDayChange}/>);
      } else if (dateTypeSelected === EDatePicker.YearInputPicker) {
        return (<CYearInputPicker handleDayChange={this.props.handleDayChange}/>);
      }
    }.bind(this);
    return (
      <div>
        <CBlockTitle text={this.props.title} small/>
        {drawDateSelection()}
      </div>
    );
  }
}

CDatePicker.defaultProps = defaultProps;
CDatePicker.propTypes = propTypes;

export default CDatePicker;
