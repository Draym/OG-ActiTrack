import {CustomTooltips} from "@coreui/coreui-plugin-chartjs-custom-tooltips";

class ChartUtils {
  static GetDefaultChartOpt(maxTicksLimit, stepSize) {
    return {
      tooltips: {
        enabled: false,
        custom: CustomTooltips,
        intersect: true,
        mode: 'point',
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
              maxTicksLimit: maxTicksLimit
            },
          }],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              stepSize: stepSize
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
  }
}

export default ChartUtils;
