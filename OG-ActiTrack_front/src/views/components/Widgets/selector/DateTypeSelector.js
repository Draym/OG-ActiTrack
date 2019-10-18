import React, {Component} from 'react';
import {EDatePicker} from "../../CDatePicker/EDatePicker";
import PropTypes from "prop-types";
import CButtonGroup from "../../CButton/CButtonGroup";
import CButtonGroupItem from "../../CButton/CButtonGroupItem";

const propTypes = {
  defaultBtn: PropTypes.number, // default value
  full: PropTypes.bool, // all types
  onClick: PropTypes.func
};
const defaultProps = {
  defaultBtn: EDatePicker.DayInputPicker,
  full: false
};

class DateTypeSelector extends Component {
  render() {
    const {full, defaultBtn, onClick} = this.props;
    return (
      <CButtonGroup defaultBtn={defaultBtn} onClick={onClick}>
        <CButtonGroupItem id={EDatePicker.DayInputPicker} value={EDatePicker.DayInputPicker} text={"Day"}/>
        <CButtonGroupItem id={EDatePicker.WeekInputPicker} value={EDatePicker.WeekInputPicker} text={"Week"}/>
        <CButtonGroupItem id={EDatePicker.MonthInputPicker} value={EDatePicker.MonthInputPicker} text={"Month"}/>
        {full && <CButtonGroupItem id={EDatePicker.QuarterInputPicker} value={EDatePicker.QuarterInputPicker} text={"Quarter"}/>}
        {full && <CButtonGroupItem id={EDatePicker.YearInputPicker} value={EDatePicker.YearInputPicker} text={"Year"}/>}
      </CButtonGroup>
    );
  }
}

DateTypeSelector.propTypes = propTypes;
DateTypeSelector.defaultProps = defaultProps;

export default DateTypeSelector;
