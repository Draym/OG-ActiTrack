import moment from "moment";
import {EDateType} from "../views/components/CDatePicker/EDateType";

class DateUtils {
  static getTypeInRange(dateType, start, end) {
    if (dateType === EDateType.Hour) {
      return DateUtils.getHoursInRange(start, end);
    } else if (dateType === EDateType.Day) {
      return DateUtils.getDaysInRange(start, end);
    } else if (dateType === EDateType.Week) {
      return DateUtils.getWeeksInRange(start, end);
    }
  }
  static getInRange(startDate, endDate, format, type) {
    let dateArray = [];
    let currentDate = moment(startDate);
    let stopDate = moment(endDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format(format));
      currentDate = moment(currentDate).add(1, type);
    }
    return dateArray;
  }

  static getWeeksInRange(startDate, endDate){
    return this.getInRange(startDate, endDate, 'YYYY-MM-DD HH:mm:ss', 'week');
  }
  static getHoursInRange(startDate, endDate){
    return this.getInRange(startDate, endDate, 'YYYY-MM-DD HH:mm:ss', 'hour');
  }
  static getDaysInRange(startDate, endDate) {
    return this.getInRange(startDate, endDate, 'YYYY-MM-DD HH:mm:ss', 'day');
  }

  static getWeekDays(weekRange) {
    let start = weekRange.from;
    const days = [start];
    for (let i = 1; i < 7; i += 1) {
      days.push(
        moment(start)
          .add(i, 'days')
          .toDate()
      );
    }
    return days;
  }

  static getMonthDays(monthRange) {
    let start = monthRange.from;
    let max = start.diff(monthRange.to, 'days') + 1;
    const days = [start];
    for (let i = 1; i < max; i += 1) {
      days.push(
        moment(start)
          .add(i, 'days')
          .toDate()
      );
    }
    return days;
  }

  static getHourRange(date) {
    return this.getDateRange('hour', date);
  }

  static getWeekRange(date) {
    return this.getDateRange('week', date);
  }

  static getMonthRange(date) {
    return this.getDateRange('month', date);
  }

  static getQuarterRange(date) {
    return this.getDateRange('quarter', date);
  }

  static getYearRange(date) {
    return this.getDateRange('year', date);
  }

  static getDateRange(type, date) {
    return {
      from: moment(date)
        .startOf(type)
        .toDate(),
      to: moment(date)
        .endOf(type)
        .toDate(),
    };
  }

  static getDay(date) {
    console.log("date: ", date);
    return (date.getDay() || 7) - 1;
  }

  static rangeToString(start, end, isYear) {
    if (isYear) {
      return "for " + moment(start).year();
    } else {
      return (moment(start).day() === moment(end).day() ? "at " + moment(start).format("DD MMM YYYY")
        : "from " + moment(start).format("DD MMM YYYY") + " to " + moment(end).format("DD MMM YYYY"));
    }
  }

  static toISO(date) {
    if (date) {
      return new Date(date).toISOString();
    }
    return new Date().toISOString();
  }
}

export default DateUtils;
