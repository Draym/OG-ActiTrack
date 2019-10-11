import React, {Component} from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import 'moment/locale/fr';
import 'moment/locale/en-gb';
import moment from "moment";
import './datepicker.css'
import PropTypes from 'prop-types';

const propTypes = {
  handleDayChange: PropTypes.func,
  allowFuture: PropTypes.bool
};

class CDayRangeInputPicker extends Component {
  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.state = {
      from: undefined,
      to: undefined,
    };
  }

  showFromMonth() {
    const {from, to} = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }

  handleFromChange(from) {
    // Change the from date and focus the "to" input field
    this.setState({from});
  }

  handleToChange(to) {
    this.setState({to}, this.showFromMonth);
    this.props.handleDayChange({first: this.state.from, last: to});
  }

  render() {
    const {allowFuture} = this.props;
    const {from, to} = this.state;
    const modifiers = {start: from, end: to};
    return (
      <div className="InputFromTo">
        <DayPickerInput
          value={from}
          inputProps={{readOnly: true}}
          placeholder="From"
          format="LL"
          dayPickerProps={{
            selectedDays: [from, {from, to}],
            disabledDays: allowFuture ? null : {after: to},
            toMonth: to,
            modifiers,
            numberOfMonths: 2,
            onDayClick: () => this.to.getInput().focus(),
          }}
          onDayChange={this.handleFromChange}
        />{' '}
        <div className="carddash">—</div>
        {' '}
        <span className="InputFromTo-to">
          <DayPickerInput
            ref={el => (this.to = el)}
            inputProps={{readOnly: true}}
            value={to}
            placeholder="To"
            format="LL"
            dayPickerProps={{
              selectedDays: [from, {from, to}],
              disabledDays: allowFuture ? null : {before: from},
              modifiers,
              month: from,
              fromMonth: from,
              numberOfMonths: 2,
            }}
            onDayChange={this.handleToChange}
          />
        </span>
      </div>
    );
  }
}

CDayRangeInputPicker.propTypes = propTypes;

export default CDayRangeInputPicker;
