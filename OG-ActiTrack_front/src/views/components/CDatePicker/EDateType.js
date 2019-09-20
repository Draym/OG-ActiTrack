import {EDatePicker} from "./EDatePicker";

export const EDateType = {
  None: undefined,
  Hour: 'hour',
  Day: 'day',
  Week: 'week',
  Month: 'month',
  Quarter: 'quarter',
  Year: 'year',
  getType: function(datePicker) {
    if (datePicker === EDatePicker.All)
      return EDateType.None;
    else if(datePicker === EDatePicker.DayPicker || datePicker === EDatePicker.DayInputPicker || datePicker === EDatePicker.DayRangeInputPicker || datePicker === EDatePicker.DayRangePicker)
      return EDateType.Day;
    else if(datePicker === EDatePicker.WeekPicker || datePicker === EDatePicker.WeekInputPicker)
      return EDateType.Week;
    else if(datePicker === EDatePicker.MonthInputPicker)
      return EDateType.Month;
    else if(datePicker === EDatePicker.QuarterInputPicker)
      return EDateType.Quarter;
    else if(datePicker === EDatePicker.YearInputPicker)
      return EDateType.Year;
  },
  getSplitType: function(datePicker) {
    if (datePicker === EDatePicker.All)
      return EDateType.Week;
    else if(datePicker === EDatePicker.DayPicker || datePicker === EDatePicker.DayInputPicker || datePicker === EDatePicker.DayRangeInputPicker || datePicker === EDatePicker.DayRangePicker)
      return EDateType.Hour;
    else if(datePicker === EDatePicker.WeekPicker || datePicker === EDatePicker.WeekInputPicker)
      return EDateType.Day;
    else if(datePicker === EDatePicker.MonthInputPicker)
      return EDateType.Day;
    else if(datePicker === EDatePicker.QuarterInputPicker)
      return EDateType.Day;
    else if(datePicker === EDatePicker.YearInputPicker)
      return EDateType.Week;
},
  getChartType: function(datePicker) {
    if (datePicker === EDatePicker.YearInputPicker)
      return EDateType.Month;
    return this.getSplitType(datePicker);
  }
};
