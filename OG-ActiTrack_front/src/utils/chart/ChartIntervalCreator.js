
import i18next from 'i18next';

let ChartIntervalCreator = function () {

  /**
   * Get an array which break a day by interval
   * @param interval in minutes
   * @returns {Array}
   */
  function createIntervalForDay(interval) {
    let labels = [];
    let hours = 24;
    let minutesByHour = 60;
    let max = hours * minutesByHour / interval;
    let time = 0;
    for (let i = 0; i < max; ++i) {
      let hour = (time / minutesByHour >> 0);
      let minute = time % minutesByHour;
      labels.push((hour < 10 ? '0' : '') + hour + "h" + (minute < 10 ? '0' : '') + minute);
      time += interval;
    }
    return labels;
  }

  /**
   * Get an array which break a week by interval
   * @param interval in hours
   * @returns {Array}
   */
  function createIntervalForWeek(interval) {
    let labels = [];
    let daysPerWeek = 7;
    let hoursPerDay = 24;
    let max = daysPerWeek * hoursPerDay / interval;
    let time = 0;
    for (let i = 0; i < max; ++i) {
      let day = (time / hoursPerDay >> 0);
      let hour = time % hoursPerDay;
      labels.push(i18next.t("days." + day + ".abv") + " " + (hour < 10 ? '0' : '') + hour + "h00");
      time += interval;
    }
    return labels;
  }

  return ({
    CreateIntervalForDay: function (interval) {
      return createIntervalForDay(interval);
    },
    CreateIntervalForWeek: function (interval) {
      return createIntervalForWeek(interval);
    }
  });
};

export default ChartIntervalCreator();
