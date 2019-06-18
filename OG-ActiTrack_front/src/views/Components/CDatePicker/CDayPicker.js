import React, {Component} from 'react';
import i18next from 'i18next';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/fr';
import 'moment/locale/en-gb';

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
    this.props.handleDayChange([selected ? undefined : day]);
  };

  render() {
    return (
      <DayPicker
        locale={i18next.t("date.format")}
        localeUtils={MomentLocaleUtils}
        selectedDays={this.state.selectedDays}
        onDayClick={this.handleDayChange}
      />
    );
  }
}

export default CDayPicker;
