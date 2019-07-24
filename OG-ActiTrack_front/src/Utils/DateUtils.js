import moment from "moment";

class DateUtils {
  static getDaysInRange(startDate, endDate) {
    let dateArray = [];
    let currentDate = moment(startDate);
    let stopDate = moment(endDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format('YYYY-MM-DD'));
      currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
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

  static getWeekRange(date) {
    return {
      from: moment(date)
        .startOf('week')
        .toDate(),
      to: moment(date)
        .endOf('week')
        .toDate(),
    };
  }

  static getMonthDays(monthRange) {
    let start = monthRange.from;
    let max = start.diff(monthRange.to, 'days')+1;
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

  static getMonthRange(date) {
    return {
      from: moment(date)
        .startOf('month')
        .toDate(),
      to: moment(date)
        .endOf('month')
        .toDate(),
    };
  }

  static getDay(date) {
    console.log("date: ", date);
    return (date.getDay() || 7) - 1;
  }
}

export default DateUtils;
