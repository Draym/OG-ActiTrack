import React, {Component} from 'react';
import CDayPicker from "./CDayPicker";
import CWeekPicker from "./CWeekPicker";
import {EDatePicker} from "./EDatePicker";
import CDayInputPicker from "./CDayInputPicker";
import CWeekInputPicker from "./CWeekInputPicker";

class CDatePicker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let drawDateSelection = function (dateTypeSelected) {
      if (dateTypeSelected === EDatePicker.DayPicker) {
        return (<CDayPicker handleDayChange={this.props.handleDayChange}/>);
      } else if (dateTypeSelected === EDatePicker.WeekPicker) {
        return (<CWeekPicker handleDayChange={this.props.handleDayChange}/>);
      } else if (dateTypeSelected === EDatePicker.DayInputPicker) {
        return (<CDayInputPicker handleDayChange={this.props.handleDayChange}/>);
      } else if (dateTypeSelected === EDatePicker.WeekInputPicker) {
        return (<CWeekInputPicker handleDayChange={this.props.handleDayChange}/>);
      }
    }.bind(this);
    return (
      <div>
        {drawDateSelection(this.props.dateTypeSelected)}
      </div>
    );
  }
}

export default CDatePicker;
