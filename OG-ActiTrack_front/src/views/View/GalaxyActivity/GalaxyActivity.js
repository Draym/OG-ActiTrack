import React, {Component} from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  ContourSeries,
  MarkSeriesCanvas,
  Borders,
  Hint,
  MarkSeries
} from "react-vis";
import ChartCreator from "../../../Utils/ChartCreator";
import "react-vis/dist/style.css";
import CSlider from "../../Components/CSlider";
import GalaxyActivityChart from "./widgets/GalaxyActivityChart";
import HttpUtils from "../../../Utils/HttpUtils";
import {ApiEndpoint} from "../../../Utils/ApiEndpoint";

let flatData = [
  {
    position: "1:10;2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "18",
    creationDate: new Date("2019-06-12 15:00:00")
  },
  {
    position: "1:10;2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "35",
    creationDate: new Date("2019-06-12 11:16:00")
  },
  {
    position: "1:10;2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "15",
    creationDate: new Date("2019-06-12 15:30:00")
  },
  {
    position: "1:10;2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "15",
    creationDate: new Date("2019-06-12 16:00:00")
  },
  {
    position: "1:10;2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "15",
    creationDate: new Date("2019-06-12 17:08:00")
  },
  {
    position: "1:10;2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "15",
    creationDate: new Date("2019-06-12 17:30:00")
  },
  {
    position: "1:10;2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "15",
    creationDate: new Date("2019-06-12 18:00:00")
  },
  {
    position: "1:10;2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "15",
    creationDate: new Date("2019-06-12 19:00:00")
  },
  {
    position: "1:10;2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "15",
    creationDate: new Date("2019-06-12 20:00:00")
  }, {
    position: "1:10;2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "15",
    creationDate: new Date("2019-06-12 23:00:00")
  },
  {
    position: "1:10;2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "0",
    creationDate: new Date("2019-06-12 01:00:00")
  },
  {
    position: "1:100;2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "0",
    creationDate: new Date("2019-06-12 01:05:00")
  },
  {
    position: "1:200;2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "0",
    creationDate: new Date("2019-06-12 01:05:00")
  },
  {
    position: "1:300;2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "0",
    creationDate: new Date("2019-06-12 01:05:00")
  },
  {
    position: "1:350;2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "0",
    creationDate: new Date("2019-06-12 01:05:00")
  },
  {
    position: "1:30;2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "0",
    creationDate: new Date("2019-06-12 01:05:00")
  },
  {
    position: "1:52;2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "0",
    creationDate: new Date("2019-06-12 01:05:00")
  },
  {
    position: "1:69;2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "0",
    creationDate: new Date("2019-06-12 01:05:00")
  },
  {
    position: "1:150;2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "0",
    creationDate: new Date("2019-06-12 01:20:00")
  },
  {
    position: "1:250;2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "0",
    creationDate: new Date("2019-06-12 01:20:00")
  },
  {
    position: "1:450;2",
    playerName: "Draym",
    server: "Fenrir",
    activity: "0",
    creationDate: new Date("2019-06-12 01:20:00")
  }
];


class GalaxyActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullData: [],
      data: [],
      selectedDay: null
    };
    this.onDateSliderChange = this.onDateSliderChange.bind(this);
    this.loadData = this.loadData.bind(this);
    this.loadData();
  }

  loadData() {
    let parameters = {
      server: this.state.server,
      galaxy: this.state.galaxy,
      start: new Date(this.state.selectedDay).toISOString().split("T")[0] + "T00:00:00.000",
      end: new Date(this.state.selectedDay).toISOString().split("T")[0] + "T23:59:59.999"
    };
    HttpUtils().GET(process.env.REACT_APP_SERVER_URL, ApiEndpoint.ACTIVITY_GlobalGalaxy, parameters, function (data) {
      console.log(data);
      if (data) {
        this.setState({
          activityLogs: data,
          guiChart: true,
          hasChange: false
        });
      } else {
        this.setState({
          errorPlayer: "There is no data for " + parameters.galaxy + " on " + parameters.server
        });
      }
    }.bind(this), function (errorStatus, error) {
      console.log(error);
      this.setState({
        errorPlayer: error,
      });
    }.bind(this));
    let result = ChartCreator.preBuildPlayerDataPerDay(flatData, 14);

    for (let i in result) {
      for (let i2 in result[i]) {
        result[i][i2].x = Number(result[i][i2].position.split(/[:;]/)[1]);
        result[i][i2].y = Number(result[i][i2].position.split(/[:;]/)[1]);
      }
    }
    console.log(result);
    this.state.fullData = result;
    this.state.data = result[this.state.sliderValue];
  }

  onDateSliderChange(value) {
    this.setState({
      data: (value < this.state.fullData.length ? [] : this.state.fullData[value])
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
       <CSlider onChange={this.onDateSliderChange} width={1250}/>
      <GalaxyActivityChart data={this.state.data} width={1250} height={500} colors={['#3193b6', '#ffffff']} xRange={[0, 499]} yRange={[0, 499]}/>
      </div>
    )
  }
}

export default GalaxyActivity;
