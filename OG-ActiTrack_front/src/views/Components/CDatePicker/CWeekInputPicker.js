import React, {Component} from 'react';
import i18next from 'i18next';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import DateUtils from '../../../Utils/DateUtils';
import moment from "moment";

import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/fr';
import 'moment/locale/en-gb';


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
    this.props.handleDayChange(DateUtils.getWeekDays(range));
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
    };

    let drawDateSelection = function () {
      return (
        <DayPickerInput
          value={selectedDay}
          onDayChange={this.handleDayChange}
          dayPickerProps={{
            locale: i18next.t("date.format"),
            localeUtils: MomentLocaleUtils,
            selectedDays: selectedDays,
            modifiers: modifiers,
            onDayMouseEnter: this.handleDayEnter,
            onDayMouseLeave: this.handleDayLeave
          }}
        />
      );
    }.bind(this);
    return (
      <div>
        {drawDateSelection()}
      </div>
    );
  }
}

export default CWeekInputPicker;
