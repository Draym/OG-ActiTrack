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
      array[i] = 0;
    }
    return array;
  }

  function createLineChartByDay(data, minutes) {

    let labels = [];
    let max = 24 * 60 / minutes;
    let time = 0;
    for (let i = 0; i < max; ++i) {
      labels.push((time / 60 >> 0) + ":" + time % 60);
      time += minutes;
    }

    console.log("data: ", data);

    let activity = generateArray(max);
    let absence = generateArray(max);
    for (let i in data) {
      let index = 0;
      if (data[i].activity !== "0") {
        index = (((data[i].creationDate.getHours() * 60) + data[i].creationDate.getMinutes()) / minutes >> 0);
        console.log("index2: ", index);
        absence[index] -= 1;
      }
      if (!TString.isNull(data[i].activity)) {
        let dt = new Date(data[i].creationDate);
        console.log("before", dt, data[i].activity);
        dt.setMinutes(dt.getMinutes() - data[i].activity);
        index = (((dt.getHours() * 60) + dt.getMinutes()) / minutes >> 0);
        console.log("after:", dt, index);
        console.log("index1: ", index);
        activity[index] += 1;
      }
    }
    console.log("activity:", activity);
    return {
      labels: labels,
      datasets: [
        {
          label: 'Verified Activity',
          backgroundColor: hexToRgba(brandDanger, 10),
          borderColor: brandDanger,
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: activity
        },
        {
          label: 'My Second dataset',
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
    GenerateDailyPlayerActivityChart: function (data) {
      return createLineChartByDay(data, 15);
    }
  });
};

export default ChartCreator();
