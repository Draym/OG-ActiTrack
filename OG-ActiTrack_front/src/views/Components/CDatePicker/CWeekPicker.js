import React, {Component} from 'react';
import i18next from 'i18next';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import DateUtils from '../../../Utils/DateUtils';

import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/fr';
import 'moment/locale/en-gb';

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
    this.setState({
      selectedDays: DateUtils.getWeekDays(DateUtils.getWeekRange(date)),
    });
    this.props.handleDayChange(DateUtils.getWeekDays(DateUtils.getWeekRange(date)));
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
    const { hoverRange, selectedDays } = this.state;

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
          <DayPicker
            locale={i18next.t("date.format")}
            localeUtils={MomentLocaleUtils}
            selectedDays={selectedDays}
            showWeekNumbers
            showOutsideDays
            modifiers={modifiers}
            onDayClick={this.handleDayChange}
            onDayMouseEnter={this.handleDayEnter}
            onDayMouseLeave={this.handleDayLeave}
            onWeekClick={this.handleWeekClick}
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

export default CWeekPicker;
