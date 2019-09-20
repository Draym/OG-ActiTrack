import React, {Component} from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/fr';
import 'moment/locale/en-gb';
import PropTypes from 'prop-types';

const propTypes = {
  handleDayChange: PropTypes.func
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
    console.log("haha");
    this.setState({
      selectedDays: [selected ? undefined : day]
    });
    this.props.handleDayChange({first: selected ? undefined : day});
  };

  render() {
    return (
      <DayPicker
        locale="eng"
        inputProps={{readOnly: true}}
        localeUtils={MomentLocaleUtils}
        selectedDays={this.state.selectedDays}
        onDayClick={this.handleDayChange}
        disabledDays={{after: new Date()}}
      />
    );
  }
}

CDayPicker.propTypes = propTypes;

export default CDayPicker;
