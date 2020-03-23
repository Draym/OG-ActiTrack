import TLogs from "../TLogs";

export default class TCharts {
  static filterSameValueData(data) {
    let value = undefined;
    for (let i = 0; i < data.length; ++i) {
      if (value === undefined) {
        value = data[i].y;
        continue;
      }
      if (data[i].y !== value) {
        value = data[i].y;
        continue
      }
      if (data[i + 1] && data[i + 1].y === value && (!data[i + 2] || data[i + 2].y === value)
        && data[i - 1] && data[i - 1].y === value && (!data[i - 2] || data[i - 2].y === value)) {
        data.splice(i, 1);
        --i;
      }
    }
    return data;
  }

  static harmonizeDateDatasets(datasets, defaultValue) {
    return this.harmonizeDatasets(datasets, function (a, b) {
      return new Date(a).getTime() === new Date(b).getTime();
    }, function (a, b) {
      return new Date(a.x) - new Date(b.x);
    }, defaultValue ? defaultValue : function(datasets, i, i2) {
      return 0;
    });
  }

  static harmonizeDatasets(datasets, isEquals, sort, defaultValue) {
    let dataModel = [];

    let getModelIndex = function (key) {
      for (let i in dataModel) {
        if (isEquals(dataModel[i].x, key))
          return i;
      }
      return -1;
    };
    // CREATE DATA MODEL
    for (let i in datasets) {
      for (let i2 in datasets[i].data) {
        if (getModelIndex(datasets[i].data[i2].x) === -1) {
          dataModel.push({x: datasets[i].data[i2].x, y: undefined});
        }
      }
    }
    // SORT DATA MODEL
    dataModel.sort(sort);
    TLogs.p("New DataModel: ", dataModel);
    // UPDATE DATASETS
    for (let i in datasets) {
      let tmpData = datasets[i].data;
      datasets[i].data = dataModel.map(a => ({...a}));
      for (let i2 in tmpData) {
        let index = getModelIndex(tmpData[i2].x);
        if (index >= 0) {
          datasets[i].data[index].y = tmpData[i2].y;
        } else {
          throw new Error("[TChart] There a missing index in the DataModel.")
        }
      }
    }
    // FILL UNDEFINED VALUE BY DEFAULT
    for (let i in datasets) {
      for (let i2 in datasets[i].data) {
        if (datasets[i].data[i2].y === undefined) {
          datasets[i].data[i2].y = defaultValue(datasets, i, i2);
        }
      }
    }
    TLogs.p("New DataSets: ", datasets);
    return datasets;
  }

  static initFinalDataDaysRange(days) {
    let data = {};
    for (let i in days) {
      data[days[i]] = 0;
    }
    return data;
  }
}
