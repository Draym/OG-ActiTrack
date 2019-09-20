import React, {Component} from 'react';

import HttpUtils from "../../../../Utils/api/HttpUtils";
import CFormInput from "../../CFormInput";
import {ApiEndpoint} from "../../../../Utils/api/ApiEndpoint";

class SelectGalaxyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      galaxies: [],
      galaxy: '',
      errorGalaxy: ''
    };
    this.handleGalaxyChange = this.handleGalaxyChange.bind(this);
    this.loadGalaxyOptions = this.loadGalaxyOptions.bind(this);
    this.generateGalaxyOptions = this.generateGalaxyOptions.bind(this);
  }

  generateGalaxyOptions(callback) {
    let parameters = {
      serverName: this.props.server
    };

    HttpUtils().GET(process.env.REACT_APP_SERVER_URL, ApiEndpoint.SERVER_Galaxy_Available, parameters, function (data) {
      if (data) {
        let galaxies = [];
        for (let i in data) {
          galaxies.push({value: data[i], label: "Galaxy G" + data[i]});
        }
        this.setState({galaxies: galaxies});
        callback(galaxies);
      } else {
        this.setState({
          errorPlayer: "There is no galaxy registered."
        });
      }
    }.bind(this), function (errorStatus, error) {
      console.log(error);
      this.setState({
        errorPlayer: error,
      });
    }.bind(this));
  }

  loadGalaxyOptions(inputValue, callback) {
    if (this.state.galaxies.length === 0) {
      this.generateGalaxyOptions(function (suggestions) {
        callback(suggestions.filter(i =>
          i.label.toLowerCase().includes(inputValue.toLowerCase())
        ));
      });
    } else {
      callback(this.state.galaxies.filter(i =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
      ));
    }
  }

  handleGalaxyChange = selectedOption => {
    if (selectedOption.value) {
      this.setState({
        galaxy: selectedOption.value, errorGalaxy: ''
      });
      this.props.onChange(selectedOption);
    }
  };

  render() {
    return (
      <div>
        <p className="input-title text-muted">Select the desired Ogame galaxy :</p>
        <CFormInput className="input-body" gui={{headIcon: "icon-map"}} type={"text"}
                    placeHolder={"Select a galaxy.."} value={this.state.galaxy} error={this.state.errorGalaxy || this.props.error}
                    autoComplete={{
                      options: this.state.galaxies,
                      handleSelectChange: this.handleGalaxyChange,
                      handleInputChange: this.handleGalaxyChange,
                      loadOptions: this.loadGalaxyOptions
                    }}/>
      </div>
    );
  }
}

export default SelectGalaxyForm;
