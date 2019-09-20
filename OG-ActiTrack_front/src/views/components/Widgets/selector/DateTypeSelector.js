import React, {Component} from 'react';
import {ButtonToolbar, Button} from 'reactstrap';
import {EDatePicker} from "../../CDatePicker/EDatePicker";
import PropTypes from "prop-types";

const propTypes = {
  default: PropTypes.number, // default value
  full: PropTypes.bool, // all types
  onChange: PropTypes.func
};
const defaultProps = {
  default: EDatePicker.DayInputPicker,
  full: false
};

class DateTypeSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateTypeSelected: this.props.default
    };
    this.onDateTypeBtnClick = this.onDateTypeBtnClick.bind(this);
  }

  onDateTypeBtnClick(radioSelected) {
    this.setState({
      dateTypeSelected: radioSelected
    });
    this.props.onChange(radioSelected);
  }

  render() {

    return (
      <ButtonToolbar aria-label="Toolbar to select the date type">
        <div className="sp-btn-in" aria-label="First group">
          <Button className="btn-sp-width" color="outline-primary"
                  onClick={() => this.onDateTypeBtnClick(EDatePicker.DayInputPicker)}
                  active={this.state.dateTypeSelected === EDatePicker.DayInputPicker}>Day</Button>
          <Button className="btn-sp-width" color="outline-primary"
                  onClick={() => this.onDateTypeBtnClick(EDatePicker.WeekInputPicker)}
                  active={this.state.dateTypeSelected === EDatePicker.WeekInputPicker}>Week</Button>
          <Button className="btn-sp-width" color="outline-primary"
                  onClick={() => this.onDateTypeBtnClick(EDatePicker.MonthInputPicker)}
                  active={this.state.dateTypeSelected === EDatePicker.MonthInputPicker}>Month</Button>
          {this.props.full &&
          <Button className="btn-sp-width" color="outline-primary"
                  onClick={() => this.onDateTypeBtnClick(EDatePicker.QuarterInputPicker)}
                  active={this.state.dateTypeSelected === EDatePicker.QuarterInputPicker}>Quarter</Button>
          }
          {this.props.full &&
          <Button className="btn-sp-width" color="outline-primary"
                  onClick={() => this.onDateTypeBtnClick(EDatePicker.YearInputPicker)}
                  active={this.state.dateTypeSelected === EDatePicker.YearInputPicker}>Year</Button>
          }
        </div>
      </ButtonToolbar>
    );
  }
}

DateTypeSelector.propTypes = propTypes;
DateTypeSelector.defaultProps = defaultProps;

export default DateTypeSelector;
