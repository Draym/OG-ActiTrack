import React, {Component} from 'react';

import HttpUtils from "../../../../Utils/HttpUtils";
import CFormInput from "../../CFormInput";
import {ApiEndpoint} from "../../../../Utils/ApiEndpoint";

class SelectGalaxyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      galaxies: [],
      galaxy: '',
      errorGalaxy: ''
    };
    this.handleGalaxyChange = this.handleGalaxyChange.bind(this);
    this.filterGalaxyOptions = this.filterGalaxyOptions.bind(this);
    this.generateGalaxyOptions = this.generateGalaxyOptions.bind(this);

    this.generateGalaxyOptions();
  }

  generateGalaxyOptions() {
    HttpUtils().GET(process.env.REACT_APP_SERVER_URL, ApiEndpoint.SERVER_Galaxy_Available, null, function (data) {
      console.log(data);
      if (data) {
        let galaxies = [];
        for (let i in data) {
          galaxies.push({value: data[i].galaxy, label: data[i].galaxy});
        }
        this.setState({galaxies: galaxies});
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

  filterGalaxyOptions(inputValue) {
    if (this.state.galaxies.length === 0)
      this.generateGalaxyOptions();
    return this.state.galaxies.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
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
        <CFormInput className="input-body" gui={{headIcon: "fa fa-galaxy"}} type={"text"}
                    placeHolder={"Select a galaxy.."} value={this.state.galaxy} error={this.state.errorGalaxy}
                    autoComplete={{
                      options: this.state.galaxies,
                      handleSelectChange: this.handleGalaxyChange,
                      handleInputChange: this.handleGalaxyChange,
                      filterOptions: this.filterGalaxyOptions
                    }}/>
      </div>
    );
  }
}

export default SelectGalaxyForm;
