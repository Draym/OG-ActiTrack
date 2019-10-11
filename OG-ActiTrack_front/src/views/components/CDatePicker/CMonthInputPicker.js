import React, {Component} from 'react';
import 'moment/locale/fr';
import 'moment/locale/en-gb';
import DatePicker from "react-datepicker/es";
import "react-datepicker/dist/react-datepicker.css";
import DateUtils from "../../../utils/DateUtils";
import PropTypes from 'prop-types';

const propTypes = {
  handleDayChange: PropTypes.func,
  allowPast: PropTypes.bool,
  allowFuture: PropTypes.bool
};

class CDayPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(day) {
    const range = DateUtils.getMonthRange(day);
    console.log(range);
    this.setState({
      selected: day
    });
    this.props.handleDayChange({first: range.from, last: range.to});
  };


  render() {
    const {allowPast, allowFuture} = this.props;
    return (
      <DatePicker
        minDate={allowPast ? null : new Date()}
        maxDate={allowFuture ? null : new Date()}
        selected={this.state.selected}
        onChange={this.handleChange}
        dateFormat="MM/yyyy"
        showMonthYearPicker
      />
    );
  }
}

CDayPicker.propTypes = propTypes;

export default CDayPicker;
