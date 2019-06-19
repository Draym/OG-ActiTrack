import {CustomTooltips} from "@coreui/coreui-plugin-chartjs-custom-tooltips";

const defaultLineChartOpt = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: false,
    mode: 'nearest',
    position: 'nearest',
    callbacks: {
      labelColor: function (tooltipItem, chart) {
        return {backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor}
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          maxTicksLimit: 36
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          stepSize: 1
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

class ChartUtils  {
  static GetDefaultLineOpt() {
      return defaultLineChartOpt;
  }
}

export default ChartUtils;
