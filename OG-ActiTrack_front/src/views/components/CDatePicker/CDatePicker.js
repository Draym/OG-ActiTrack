import React, {Component} from 'react';
import CDayPicker from "./CDayPicker";
import CWeekPicker from "./CWeekPicker";
import {EDatePicker} from "./EDatePicker";
import CDayInputPicker from "./CDayInputPicker";
import CWeekInputPicker from "./CWeekInputPicker";
import COptionalCol from "../COptionalCol";

class CDatePicker extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(days) {
    if (this.props.dataKey) {
      let data = {};
      let dateTypeSelected = this.props.dateTypeSelected;
      data[this.props.dataKey] = (days.length === 1 && (dateTypeSelected === EDatePicker.DayPicker || dateTypeSelected === EDatePicker.DayInputPicker) ? days[0] : days);
      this.props.onChange(data);
    } else {
      this.props.onChange(days);
    }
  }

  render() {
    let drawDateSelection = function (dateTypeSelected) {
      if (dateTypeSelected === EDatePicker.DayPicker) {
        return (<CDayPicker onChange={this.onChange}/>);
      } else if (dateTypeSelected === EDatePicker.WeekPicker) {
        return (<CWeekPicker onChange={this.onChange}/>);
      } else if (dateTypeSelected === EDatePicker.DayInputPicker) {
        return (<CDayInputPicker onChange={this.onChange}/>);
      } else if (dateTypeSelected === EDatePicker.WeekInputPicker) {
        return (<CWeekInputPicker onChange={this.onChange}/>);
      }
    }.bind(this);
    return (
      <COptionalCol col={this.props.col}>
        {this.props.title && <p className="text-muted input-title">{this.props.title}</p>}
        {drawDateSelection(this.props.dateTypeSelected)}
      </COptionalCol>
    );
  }
}

export default CDatePicker;
