import React, {Component} from 'react';

import HttpUtils from "../../../../Utils/HttpUtils";
import CFormInput from "../../CFormInput";
import {ApiEndpoint} from "../../../../Utils/ApiEndpoint";

class SelectServerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servers: [],
      server: '',
      errorServer: ''
    };
    this.handleServerChange = this.handleServerChange.bind(this);
    this.filterServerOptions = this.filterServerOptions.bind(this);
    this.generateServerOptions = this.generateServerOptions.bind(this);

    this.generateServerOptions();
  }

  generateServerOptions() {
    HttpUtils().GET(process.env.REACT_APP_SERVER_URL, ApiEndpoint.SERVER_Available, null, function (data) {
      console.log(data);
      if (data) {
        let servers = [];
        for (let i in data) {
          servers.push({value: data[i].server, label: data[i].server});
        }
        this.setState({servers: servers});
      } else {
        this.setState({
          errorPlayer: "There is no server registered."
        });
      }
    }.bind(this), function (errorStatus, error) {
      console.log(error);
      this.setState({
        errorPlayer: error,
      });
    }.bind(this));
  }

  filterServerOptions(inputValue) {
    if (this.state.servers.length === 0)
      this.generateServerOptions();
    return this.state.servers.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  handleServerChange = selectedOption => {
    if (selectedOption.value) {
      this.setState({
        server: selectedOption.value, errorServer: ''
      });
      this.props.onChange(selectedOption);
    }
  };

  render() {
    return (
      <div>
        <p className="input-title text-muted">Select the desired Ogame server :</p>
        <CFormInput className="input-body" gui={{headIcon: "fa fa-server"}} type={"text"}
                    placeHolder={"Select a server.."} value={this.state.server} error={this.state.errorServer}
                    autoComplete={{
                      options: this.state.servers,
                      handleSelectChange: this.handleServerChange,
                      handleInputChange: this.handleServerChange,
                      filterOptions: this.filterServerOptions
                    }}/>
      </div>
    );
  }
}

export default SelectServerForm;
