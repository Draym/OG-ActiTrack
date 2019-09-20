import React, {Component} from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/fr';
import 'moment/locale/en-gb';
import PropTypes from 'prop-types';

const propTypes = {
  handleDayChange: PropTypes.func
};
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
    this.props.handleDayChange({first: selectedDay});
  }


  render() {
    const { selectedDays} = this.state;
    return (
        <DayPickerInput
          value={selectedDays}
          inputProps={{readOnly: true}}
          onDayChange={this.handleDayChange}
          dayPickerProps={{
            locale: "eng",
            localeUtils: MomentLocaleUtils,
            selectedDays: selectedDays,
            disabledDays:{ after: new Date() }
          }}
        />
    );
  }
}

CDayInputPicker.propTypes = propTypes;

export default CDayInputPicker;
