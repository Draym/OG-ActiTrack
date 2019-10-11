import React, {Component} from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import moment from "moment";
import DateUtils from '../../../utils/DateUtils';

import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/fr';
import 'moment/locale/en-gb';
import PropTypes from 'prop-types';

const propTypes = {
  handleDayChange: PropTypes.func,
  allowFuture: PropTypes.bool
};

class CWeekInputPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverRange: undefined,
      selectedDay: undefined,
      selectedDays: [],
    };
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleDayEnter = this.handleDayEnter.bind(this);
    this.handleDayLeave = this.handleDayLeave.bind(this);
  }

  handleDayChange(selectedDay, modifiers, dayPickerInput) {
    const input = dayPickerInput.getInput();
    let range = DateUtils.getWeekRange(selectedDay);
    this.setState({
      selectedDay: moment(range.from).format("DD-MM-YYYY") + ' to ' + moment(range.to).format("DD-MM-YYYY"),
      selectedDays: DateUtils.getWeekDays(range),
      isEmpty: !input.value.trim()
    });
    this.props.handleDayChange({first: range.from, last: range.to});
  }

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

  render() {
    const {allowFuture} = this.props;
    const {hoverRange, selectedDays, selectedDay} = this.state;
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
      sunday: day => day.getDay() === 0
    };
    return (
      <DayPickerInput
        value={selectedDay}
        inputProps={{readOnly: true}}
        onDayChange={this.handleDayChange}
        dayPickerProps={{
          locale: "eng",
          localeUtils: MomentLocaleUtils,
          selectedDays: selectedDays,
          modifiers: modifiers,
          onDayMouseEnter: this.handleDayEnter,
          onDayMouseLeave: this.handleDayLeave,
          disabledDays: allowFuture ? null : {after: new Date()}
        }}
      />
    );
  }
}

CWeekInputPicker.propTypes = propTypes;

export default CWeekInputPicker;
