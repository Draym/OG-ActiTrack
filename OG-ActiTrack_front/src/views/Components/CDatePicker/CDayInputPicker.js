import React, {Component} from 'react';
import i18next from 'i18next';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/fr';
import 'moment/locale/en-gb';

class CDayInputPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: undefined
    };
    this.handleDayChange = this.handleDayChange.bind(this);
  }

  handleDayChange(selectedDay) {
    this.setState({
      selectedDay
    });
    this.props.handleDayChange([selectedDay]);
  }


  render() {
    const { selectedDays} = this.state;
    return (
        <DayPickerInput
          value={selectedDays}
          onDayChange={this.handleDayChange}
          dayPickerProps={{
            locale: i18next.t("date.format"),
            localeUtils: MomentLocaleUtils,
            selectedDays: selectedDays
          }}
        />
    );
  }
}

export default CDayInputPicker;
