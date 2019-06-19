import {getStyle, hexToRgba} from "@coreui/coreui/dist/js/coreui-utilities";
import TString from "./TString";

const brandPrimary = getStyle('--primary');
const brandSuccess = getStyle('--success');
const brandInfo = getStyle('--info');
const brandWarning = getStyle('--warning');
const brandDanger = getStyle('--danger');

let ChartCreator = function () {
  function generateArray(max) {
    let array = [];
    for (let i = 0; i < max; ++i) {
      array[i] = null;
    }
    return array;
  }

  function preBuildPlayerDataPerDay(data, interval) {
    let result = {};

    let addLog = function(result, index, activity, position){
      if(!result[index])
        result[index] = [];
      for (let i = 0; i < result[index].length; ++i) {
        if (result[index][i].position === position) {
          console.log("duplicate found: ", result[index][i]);
          if (activity) {
            result[index][i].activity = activity;
            console.log("activity changed");
          }
          return;
        }
      }
      console.log("activity pushed");
      result[index].push({
        activity: activity,
        position: position
      });
    };

    for (let i = 0; i < data.length; ++i) {
      let index = 0;
      if (data[i].activity !== "0") {
        index = (((data[i].creationDate.getHours() * 60) + data[i].creationDate.getMinutes()) / interval >> 0);
        console.log("index2: ", index);
        addLog(result, index, false, data[i].position);
      }
      if (!TString.isNull(data[i].activity)) {
        let dt = new Date(data[i].creationDate);
        console.log("before", dt, data[i].activity);
        dt.setMinutes(dt.getMinutes() - data[i].activity);
        index = (((dt.getHours() * 60) + dt.getMinutes()) / interval >> 0);
        console.log("after:", dt, index);
        console.log("index1: ", index);
        addLog(result, index, true, data[i].position);
      }
    }
    return result;
  }

  function createLineChartByDay(data, interval) {

    let labels = [];
    let max = 24 * 60 / interval;
    let time = 0;
    for (let i = 0; i < max; ++i) {
      let hour = (time / 60 >> 0);
      let minute =  time % 60;
      labels.push((hour < 10 ? '0' : '') + hour + "h" + (minute < 10 ? '0' : '') + minute);
      time += interval;
    }

    console.log("data: ", data);

    let activity = generateArray(max);
    let absence = generateArray(max);

    let logs = preBuildPlayerDataPerDay(data, interval);

    console.log("Logs: ", logs);
    for (let i in logs) {
      for (let i2 = 0; i2 < logs[i].length; ++i2) {
        if (!activity[i])
          activity[i] = 0;
        if (!absence[i])
          absence[i] = 0;
        if (logs[i][i2].activity) {
          activity[i] += 1;
        } else {
          absence[i] -= 1;
        }
      }
    }

    console.log("activity:", activity);
    return {
      labels: labels,
      datasets: [
        {
          label: 'Planet with activity',
          backgroundColor: hexToRgba(brandDanger, 10),
          borderColor: brandDanger,
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: activity
        },
        {
          label: 'Planet without activity',
          backgroundColor: hexToRgba(brandInfo, 10),
          borderColor: brandInfo,
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: absence
        }
      ]
    };
  }


  return ({
    GenerateDailyPlayerActivityBarChart: function (data, interval) {
      return createLineChartByDay(data, interval);
    }
  });
};

export default ChartCreator();
