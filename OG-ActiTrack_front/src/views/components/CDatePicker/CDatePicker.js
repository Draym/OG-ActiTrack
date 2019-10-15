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
import TimePicker from "rc-time-picker/es/TimePicker";
import {Row, Col} from "reactstrap/es";
import PropTypes from 'prop-types';
import moment from 'moment';
import 'rc-time-picker/assets/index.css';

const format = 'h:mm a';

const propTypes = {
  className: PropTypes.string,
  dateTypeSelected: PropTypes.number,

  // picker
  handleDayChange: PropTypes.func,
  allowPast: PropTypes.bool,
  allowFuture: PropTypes.bool,
  timePicker: PropTypes.bool,

  // picker style
  title: PropTypes.string,
  titleClass: PropTypes.string,
  titleXS: PropTypes.number,
  titleSM: PropTypes.number,
  titleMD: PropTypes.number,
  titleLG: PropTypes.number,
  titleXL: PropTypes.number
};

const defaultProps = {
  timePicker: false,
  allowPast: true,
  allowFuture: true,
  dateTypeSelected: 1,
  titleXS: 12,
  titleSM: 12,
  titleMD: 12,
  titleLG: 4,
  titleXL: 4
};

class CDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: undefined,
      time: moment().hour(0).minute(0).second(0)
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.commitDateChange = this.commitDateChange.bind(this);
  }

  commitDateChange(selected, time) {
    let date = {};
    if (selected.first) {
      date.first = new Date(selected.first);
      date.first.setHours(time.hour());
      date.first.setMinutes(time.minute());
      date.first.setSeconds(time.second());
    }
    if (selected.last) {
      date.last = new Date(selected.last);
      date.last.setHours(time.hour());
      date.last.setMinutes(time.minute());
      date.last.setSeconds(time.second());
    }
    if (this.props.handleDayChange) {
      this.props.handleDayChange(date);
    }
  }

  onDateChange(selected) {
    this.setState({
      date: selected
    });
    this.commitDateChange(selected, this.state.time);
  }

  onTimeChange(value) {
    console.log(value);
    this.setState({
      time: value
    });
    if (this.state.date) {
      this.commitDateChange(this.state.date, value);
    }
  }

  render() {
    const {onTimeChange, onDateChange} = this;
    const {time} = this.state;
    const {dateTypeSelected, title, titleClass, className, allowPast, allowFuture, timePicker, titleXS, titleSM, titleMD, titleLG, titleXL} = this.props;
    let drawWithTimePicker = function (component) {
      return (
        <div className="DateTimePicker">
          {component}
          <TimePicker
            showSecond={false}
            defaultValue={time}
            className="xxx"
            onChange={onTimeChange}
            format={format}
            use12Hours
            inputReadOnly
          />
        </div>
      )
    };
    let drawDateSelection = function () {
      if (dateTypeSelected === EDatePicker.DayPicker) {
        const component = <CDayPicker handleDayChange={onDateChange} allowPast={allowPast} allowFuture={allowFuture}/>;
        return timePicker ? drawWithTimePicker(component) : component;
      } else if (dateTypeSelected === EDatePicker.WeekPicker) {
        return (<CWeekPicker handleDayChange={onDateChange} allowPast={allowPast} allowFuture={allowFuture}/>);
      } else if (dateTypeSelected === EDatePicker.DayInputPicker) {
        const component = <CDayInputPicker handleDayChange={onDateChange} allowPast={allowPast}
                                           allowFuture={allowFuture}/>;
        return timePicker ? drawWithTimePicker(component) : component;
      } else if (dateTypeSelected === EDatePicker.WeekInputPicker) {
        return (<CWeekInputPicker handleDayChange={onDateChange} allowPast={allowPast} allowFuture={allowFuture}/>);
      } else if (dateTypeSelected === EDatePicker.DayRangePicker) {
        return (<CDayRangePicker handleDayChange={onDateChange} allowPast={allowPast} allowFuture={allowFuture}/>);
      } else if (dateTypeSelected === EDatePicker.DayRangeInputPicker) {
        return (
          <CDayRangeInputPicker handleDayChange={onDateChange} allowPast={allowPast} allowFuture={allowFuture}/>);
      } else if (dateTypeSelected === EDatePicker.MonthInputPicker) {
        return (<CMonthInputPicker handleDayChange={onDateChange} allowPast={allowPast} allowFuture={allowFuture}/>);
      } else if (dateTypeSelected === EDatePicker.QuarterInputPicker) {
        return (
          <CQuarterInputPicker handleDayChange={onDateChange} allowPast={allowPast} allowFuture={allowFuture}/>);
      } else if (dateTypeSelected === EDatePicker.YearInputPicker) {
        return (<CYearInputPicker handleDayChange={onDateChange} allowPast={allowPast} allowFuture={allowFuture}/>);
      }
    }.bind(this);

    if (title) {
      return (
        <Row className={className}>
          <Col className={titleClass} xs={titleXS} sm={titleSM} md={titleMD} lg={titleLG} xl={titleXL}>
            <span>{title}</span>
          </Col>
          <Col xs={titleXS === 12 ? 12 : 12 - titleXS} sm={titleSM === 12 ? 12 : 12 - titleSM}
               md={titleMD === 12 ? 12 : 12 - titleMD} lg={titleLG === 12 ? 12 : 12 - titleLG}
               xl={titleXL === 12 ? 12 : 12 - titleXL}>
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
