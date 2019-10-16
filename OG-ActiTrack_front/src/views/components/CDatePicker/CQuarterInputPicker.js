import React from 'react';
import DateUtils from "../../../utils/DateUtils";
import moment from "moment";
import CPopup from "../CPopup/CPopup";
import PropTypes from 'prop-types';

const propTypes = {
  handleDayChange: PropTypes.func,
  allowPast: PropTypes.bool,
  allowFuture: PropTypes.bool
};

class CQuarterInputPicker extends CPopup {
  constructor(props) {
    super(props);
    const now = moment().year();
    this.initState({
      currentYear: now,
      year: now,

      selectedYear: undefined,
      selectedQuarter: undefined,

      uiQuarters: this.getVisibleQuarters(),
      selectedText: ""
    });

    this.handleChange = this.handleChange.bind(this);
    this.previousYear = this.previousYear.bind(this);
    this.nextYear = this.nextYear.bind(this);
  }

  getVisibleQuarters() {
    let quarters = [];
    quarters.push([]);
    quarters[0].push({key: 0, title: 'Quarter 1', month: 'Jan, Feb, Mar'});
    quarters[0].push({key: 1, title: 'Quarter 2', month: 'Apr, May, Jun'});
    quarters.push([]);
    quarters[1].push({key: 2, title: 'Quarter 3', month: 'Jul, Aug, Sep'});
    quarters[1].push({key: 3, title: 'Quarter 4', month: 'Oct, Noc, Dec'});
    return quarters;
  }

  handleChange(quarter) {
    this.hidePopup();
    const range = DateUtils.getQuarterRange(new Date(this.state.year, (quarter * 3) + 1, 1));
    this.setState({
      selectedYear: this.state.year,
      selectedQuarter: quarter,
      selectedText: "quarter " + (quarter + 1) + " of " + this.state.year
    });
    this.props.handleDayChange({first: range.from, last: range.to});
  };

  previousYear() {
    if (!this.props.allowPast && this.state.year <= this.state.currentYear)
      return;
    this.setState({year: this.state.year - 1});
  }

  nextYear() {
    if (!this.props.allowFuture && this.state.year === this.state.currentYear)
      return;
    this.setState({year: this.state.year + 1});
  }

  render() {
    const {allowPast, allowFuture} = this.props;
    const {year, currentYear, uiQuarters, selectedYear, selectedQuarter, selectedText} = this.state;
    return (
      <div>
        <div className="react-datepicker-wrapper">
          <div className="react-datepicker__input-container">
            <input type="text" value={selectedText} onChange={this.changeDisabled}
                   onClick={this.handleClick} placeholder="quarter x of yyyy"
                   ref={node => {
                     this.state.parentNode = node;
                   }}/>
          </div>
        </div>
        {/* date picker quarter */}
        <div className="picker-popper react-datepicker-popper" data-placement="bottom-start">
          {this.state.popoverOpen &&
          <div className="react-datepicker"
               ref={node => {
                 this.state.nodes.container = node;
               }}>
            <div className="react-datepicker__triangle"/>
            <button type="button"
                    className={"react-datepicker__navigation react-datepicker__navigation--previous" + (!allowPast && year <= currentYear ? ' hidden' : '')}
                    onClick={this.previousYear}/>
            <button type="button"
                    className={"react-datepicker__navigation react-datepicker__navigation--next" + (!allowFuture && year === currentYear ? ' hidden' : '')}
                    onClick={this.nextYear}/>
            <div className="react-datepicker__month-container">
              <div className="react-datepicker__header react-datepicker-year-header">{year}</div>
              <div className="react-datepicker__quarter react-datepicker__monthPicker" role="listbox"
                   aria-label="month-2019-08">
                {
                  uiQuarters.map((array, i) => {
                    return (
                      <div key={i} className="react-datepicker__month-wrapper">
                        {array.map((quarter, i) => (
                          <div key={i}
                               className={"react-datepicker__quarter-text" + (!allowPast && (year <= currentYear && moment().month() > quarter.key * 3) ? " disabled" : '') + (!allowFuture && (year === currentYear && moment().month() < quarter.key * 3) ? " disabled" : '') + (selectedYear === year && selectedQuarter === quarter.key ? ' selected' : '')}
                               onClick={() => this.handleChange(quarter.key)}>
                            <h5>{quarter.title}</h5>
                            <small>{quarter.month}</small>
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

CQuarterInputPicker.propTypes = propTypes;

export default CQuarterInputPicker;
