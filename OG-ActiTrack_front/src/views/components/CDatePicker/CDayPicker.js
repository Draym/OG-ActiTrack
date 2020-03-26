import React, {Component} from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/fr';
import 'moment/locale/en-gb';
import PropTypes from 'prop-types';
import DateUtils from "../../../utils/DateUtils";

const propTypes = {
  handleDayChange: PropTypes.func,
  allowPast: PropTypes.bool,
  allowFuture: PropTypes.bool
};

class CDayPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDays: [],
    };
    this.handleDayChange = this.handleDayChange.bind(this);
  }

  handleDayChange(day, {selected}) {
    let selectedDay = selected ? undefined : day;
    this.setState({
      selectedDays: [selectedDay]
    });
    let range = DateUtils.getDayRange(selectedDay);
    this.props.handleDayChange({first: range.from, last: range.to});
  };

  render() {
    const {allowPast, allowFuture} = this.props;
    return (
      <DayPicker
        locale="eng"
        inputProps={{readOnly: true}}
        localeUtils={MomentLocaleUtils}
        selectedDays={this.state.selectedDays}
        onDayClick={this.handleDayChange}
        disabledDays={{before: allowPast ? null : new Date(), after: allowFuture ? null : new Date()}}
      />
    );
  }
}

CDayPicker.propTypes = propTypes;

export default CDayPicker;
