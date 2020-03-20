import {getStyle, hexToRgba} from "@coreui/coreui/dist/js/coreui-utilities";
import TString from "../TString";
import ChartIntervalCreator from "./ChartIntervalCreator";
import DateUtils from "../DateUtils";
import MathUtils from "../MathUtils";
import TLogs from "../TLogs";

const brandPrimary = getStyle('--primary');
const brandSuccess = getStyle('--success');
const brandInfo = getStyle('--info');
const brandWarning = getStyle('--warning');
const brandDanger = getStyle('--danger');

let ChartCreator = function () {
  function generateArray(max) {
    let array = [];
    for (let i = 0; i < max; ++i) {
      array[i] = 0;
    }
    return array;
  }

  let addActivityLog = function (result, index, activity, position, override = true) {
    if (!result[index])
      result[index] = [];
    if (override) {
      for (let i = 0; i < result[index].length; ++i) {
        if (result[index][i].position === position) {
          TLogs.p("duplicate found: ", result[index][i]);
          if (activity) {
            result[index][i].activity = activity;
            TLogs.p("activity changed");
          }
          return;
        }
      }
    }
    TLogs.p("activity pushed");
    result[index].push({
      activity: activity,
      position: position
    });
  };

  function preBuildPlayerDataPerWeek(data, interval) {
    let result = {};
    for (let i = 0; i < data.length; ++i) {
      let index = 0;
      if (data[i].activity !== "0") {
        index = (((DateUtils.getDay(new Date(data[i].creationDate)) * 24) + new Date(data[i].creationDate).getHours()) / interval >> 0);
        TLogs.p("index1: ", index);
        addActivityLog(result, index, false, data[i].position, false);
      }
      if (!TString.isNull(data[i].activity)) {
        let dt = new Date(data[i].creationDate);
        dt.setMinutes(dt.getMinutes() - data[i].activity);
        index = (((DateUtils.getDay(dt) * 24) + dt.getHours()) / interval >> 0);
        TLogs.p("index2: ", index);
        addActivityLog(result, index, true, data[i].position, false);
      }
    }
    return result;
  }

  function preBuildPlayerDataPerDay(data, interval) {
    let result = {};
    for (let i = 0; i < data.length; ++i) {
      let index = 0;
      if (data[i].activity !== "0") {
        index = (((new Date(data[i].creationDate).getHours() * 60) + new Date(data[i].creationDate).getMinutes()) / interval >> 0);
        TLogs.p("index1: ", index);
        addActivityLog(result, index, false, data[i].position);
      }
      if (!TString.isNull(data[i].activity)) {
        let dt = new Date(data[i].creationDate);
        dt.setMinutes(dt.getMinutes() - data[i].activity);
        index = (((dt.getHours() * 60) + dt.getMinutes()) / interval >> 0);
        TLogs.p("index2: ", index);
        addActivityLog(result, index, true, data[i].position);
      }
    }
    return result;
  }

  function createActivityDataPerDay(data, interval) {

    let labels = ChartIntervalCreator.CreateIntervalForDay(interval);
    let activity = generateArray(labels.length);
    let absence = generateArray(labels.length);

    TLogs.p("data: ", data);

    let logs = preBuildPlayerDataPerDay(data, interval);

    TLogs.p("Logs: ", logs);
    for (let i in logs) {
      for (let i2 = 0; i2 < logs[i].length; ++i2) {
        if (logs[i][i2].activity) {
          activity[i] += 1;
        } else {
          absence[i] -= 1;
        }
      }
    }

    return {labels: labels, activity: activity, absence: absence}
  }

  /**
   *
   * @param data
   * @param interval
   * @param labelNames {Array} with 2 values
   * @returns {{datasets: {backgroundColor: *, borderColor: *, data: Array, borderWidth: number, label: *, pointHoverBackgroundColor: string}[], labels: (*|Array)}[]}
   */
  function createChartPerDay(data, interval, labelNames) {
    let result = createActivityDataPerDay(data, interval);
    return [{
      labels: result.labels,
      datasets: [
        {
          label: labelNames[0],
          backgroundColor: hexToRgba(brandDanger, 10),
          borderColor: brandDanger,
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: result.activity
        },
        {
          label: labelNames[1],
          backgroundColor: hexToRgba(brandInfo, 10),
          borderColor: brandInfo,
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: result.absence
        }
      ]
    }];
  }

  /**
   *
   * @param data
   * @param interval
   * @param labelNames {Array} with 1 value
   * @returns {Array}
   */
  function createChartPerDayPerPosition(data, interval, labelNames) {
    let filteredData = {};

    //filter by position
    for (let i = 0; i < data.length; ++i) {
      if (!filteredData[data[i].position]) {
        filteredData[data[i].position] = [];
      }
      filteredData[data[i].position].push(data[i]);
    }
    let result = [];
    for (let pos in filteredData) {
      let posChart = createChartPerDay(filteredData[pos], interval, labelNames);
      result.push(posChart[0]);
    }
    return result;
  }

  /**
   *
   * @param data
   * @param interval
   * @param labelNames {Array} with 1 value
   * @returns {Array}
   */
  function createChartPerWeek(data, interval, labelNames) {
    let labels = ChartIntervalCreator.CreateIntervalForWeek(interval);
    let result = generateArray(labels.length);
    TLogs.p("data: ", data, labels);

    let logs = preBuildPlayerDataPerWeek(data, interval);

    TLogs.p("Logs: ", logs);
    for (let i in logs) {
      let activity = 0;
      let absence = 0;
      for (let i2 = 0; i2 < logs[i].length; ++i2) {
        if (logs[i][i2].activity) {
          activity += 1;
        } else {
          absence += 1;
        }
      }
      result[i] = MathUtils.round(activity * 100 / (activity + absence));
    }

    return [{
      labels: labels,
      datasets: [
        {
          label: labelNames[0],
          backgroundColor: hexToRgba(brandWarning, 10),
          borderColor: brandWarning,
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: result
        }
      ]
    }];
  }

  /**
   *
   * @param data
   * @param interval
   * @param labelNames {Array} with 1 value
   * @returns {Array}
   */
  function createChartPerWeekSplit(data, interval, labelNames) {
    let filteredData = {};

    //filter by position
    for (let i = 0; i < data.length; ++i) {
      if (!filteredData[new Date(data[i].creationDate).getDay()]) {
        filteredData[new Date(data[i].creationDate).getDay()] = [];
      }
      filteredData[new Date(data[i].creationDate).getDay()].push(data[i]);
    }
    let result = [];
    for (let day in filteredData) {
      let posChart = createChartPerDay(filteredData[day], interval, labelNames);
      result.push(posChart[0]);
    }
    return result;
  }

  return ({
    GeneratePlayerActivityPerDay: function (data, interval, labelNames) {
      return createChartPerDay(data, interval, labelNames);
    },
    GeneratePlayerActivityPerDayPerPosition: function (data, interval, labelNames) {
      return createChartPerDayPerPosition(data, interval, labelNames);
    },
    GeneratePlayerActivityPerWeek: function (data, interval, labelNames) {
      return createChartPerWeek(data, interval, labelNames);
    },
    GeneratePlayerActivityPerWeekSplit: function (data, interval, labelNames) {
      return createChartPerWeekSplit(data, interval, labelNames);
    },
    preBuildPlayerDataPerDay: function(data, interval) {
      return preBuildPlayerDataPerDay(data, interval);
    }
  });
};

export default ChartCreator();
