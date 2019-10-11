import React from 'react';
import moment from "moment";
import DateUtils from "../../../utils/DateUtils";
import CPopup from "../CPopup";
import PropTypes from 'prop-types';

const propTypes = {
  handleDayChange: PropTypes.func,
  allowPast: PropTypes.bool,
  allowFuture: PropTypes.bool
};

class CYearInputPicker extends CPopup {
  constructor(props) {
    super(props);
    let now = moment().year();
    this.initState({
      currentYear: now,

      selectedYear: undefined,

      uiMiddleYear: now,
      uiYears: this.getVisibleYears(now).uiYears,
    });
    this.handleChange = this.handleChange.bind(this);
    this.previousYear = this.previousYear.bind(this);
    this.nextYear = this.nextYear.bind(this);
  }

  getVisibleYears(middle) {
    let current = middle - 4;
    let years = [];
    for (let i = 0; i < 9; ++i) {
      if (i % 3 === 0) {
        years.push([]);
      }
      years[Math.floor(i / 3)].push(current);
      ++current;
    }
    return {uiYears: years, uiMiddleYear: middle};
  }

  handleChange(year) {
    this.hidePopup();
    const range = DateUtils.getYearRange(new Date(year, 1, 1));
    this.setState({
      selectedYear: year
    });
    this.props.handleDayChange({first: range.from, last: range.to});
  };

  previousYear() {
    if (!this.props.allowPast && (this.state.uiMiddleYear - 9) < this.state.currentYear)
      return;
    this.setState(this.getVisibleYears(this.state.uiMiddleYear - 9));
  }

  nextYear() {
    if (!this.props.allowFuture && (this.state.uiMiddleYear + 9) > this.state.currentYear)
      return;
    this.setState(this.getVisibleYears(this.state.uiMiddleYear + 9));
  }

  render() {
    const {allowPast, allowFuture} = this.props;
    const {selectedYear, currentYear, uiYears, uiMiddleYear} = this.state;
    return (
      <div>
        <div className="react-datepicker-wrapper">
          <div className="react-datepicker__input-container">
            <input id="yearInputPicker" type="text" value={selectedYear ? selectedYear : ""}
                   onChange={this.changeDisabled} onClick={this.handleClick}
                   ref={node => {
                     this.state.parentNode = node;
                   }}/>
          </div>
        </div>
        {/* date picker year */}
        <div className="picker-popper react-datepicker-popper" data-placement="bottom-start">
          {this.state.popoverOpen &&
          <div className="react-datepicker"
               ref={node => {
                 this.state.nodes.container = node;
               }}>
            <div className="react-datepicker__triangle"/>
            <button type="button"
                    className={"react-datepicker__navigation react-datepicker__navigation--previous" + (!allowPast && uiMiddleYear < currentYear ? ' disabled' : '')}
                    onClick={this.previousYear}/>
            <button type="button"
                    className={"react-datepicker__navigation react-datepicker__navigation--next" + (!allowFuture && uiMiddleYear === currentYear ? ' disabled' : '')}
                    onClick={this.nextYear}/>
            <div className="react-datepicker__year-container">
              <div className="react-datepicker__header react-datepicker-year-header"/>
              <div className="react-datepicker__year react-datepicker__monthPicker" role="listbox"
                   aria-label="month-2019-08">
                {
                  uiYears.map((array, i) => {
                    return (
                      <div key={i} className="react-datepicker__month-wrapper">
                        {array.map((year, i) => (
                          <div key={i}
                               className={"react-datepicker__year-text" + (!allowPast && year < currentYear ? " disabled" : '') + (!allowFuture && year > currentYear ? " disabled" : '') + (this.state.selectedYear === year ? " selected" : '')}
                               onClick={() => this.handleChange(year)}>
                            {year}
                          </div>))}
                      </div>
                    );
                  })
                }
              </div>
            </div>
          </div>}
        </div>
      </div>
    );
  }
}

CYearInputPicker.propTypes = propTypes;

export default CYearInputPicker;
