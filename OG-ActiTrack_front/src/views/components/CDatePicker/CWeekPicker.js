import React, {Component} from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import DateUtils from '../../../utils/DateUtils';

import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/fr';
import 'moment/locale/en-gb';
import PropTypes from 'prop-types';

const propTypes = {
  handleDayChange: PropTypes.func,
  allowFuture: PropTypes.bool
};

class CWeekPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverRange: undefined,
      selectedDays: [],
    };
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleDayEnter = this.handleDayEnter.bind(this);
    this.handleDayLeave = this.handleDayLeave.bind(this);
    this.handleWeekClick = this.handleWeekClick.bind(this);
  }

  handleDayChange = date => {
    const range = DateUtils.getWeekRange(date);
    this.setState({
      selectedDays: DateUtils.getWeekDays(range),
    });
    this.props.handleDayChange({first: range.from, last: range.to});
  };

  handleDayEnter = date => {
    this.setState({
      hoverRange: DateUtils.getWeekRange(date),
    });
  };

  handleDayLeave = () => {
    this.setState({
      hoverRange: undefined,
    });
  };

  handleWeekClick = (weekNumber, days, e) => {
    this.setState({
      selectedDays: days,
    });
  };

  render() {
    const {allowFuture} = this.props;
    const {hoverRange, selectedDays} = this.state;
    const daysAreSelected = selectedDays.length > 0;

    const modifiers = {
      hoverRange,
      selectedRange: daysAreSelected && {
        from: selectedDays[0],
        to: selectedDays[6],
      },
      hoverRangeStart: hoverRange && hoverRange.from,
      hoverRangeEnd: hoverRange && hoverRange.to,
      selectedRangeStart: daysAreSelected && selectedDays[0],
      selectedRangeEnd: daysAreSelected && selectedDays[6],
    };

    return (
      <DayPicker
        firstDayOfWeek={1}
        locale="eng"
        localeUtils={MomentLocaleUtils}
        selectedDays={selectedDays}
        showWeekNumbers
        showOutsideDays
        modifiers={modifiers}
        onDayClick={this.handleDayChange}
        onDayMouseEnter={this.handleDayEnter}
        onDayMouseLeave={this.handleDayLeave}
        onWeekClick={this.handleWeekClick}
        disabledDays={allowFuture ? null : {after: new Date()}}
      />
    );
  }
}

CWeekPicker.propTypes = propTypes;

export default CWeekPicker;
