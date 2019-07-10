import React, {Component} from 'react';

import HttpUtils from "../../../../Utils/HttpUtils";
import CFormInput from "../../CFormInput";
import {ApiEndpoint} from "../../../../Utils/ApiEndpoint";

class SelectPlayerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: '',
      errorPlayer: ''
    };
    this.handlePlayerChange = this.handlePlayerChange.bind(this);
    this.verifyPseudo = this.verifyPseudo.bind(this);
    this.loadPlayerOptions = this.loadPlayerOptions.bind(this);
  }

  /*
    handlePlayerChange(event) {
      this.setState({
        playerName: event.target.value, errorPlayer: ''
      });
      this.props.onChange(event.target.value);
    }*/

  handlePlayerChange = selectedOption => {
    console.log("player: ", selectedOption);
    if (selectedOption.value) {
      this.setState({
        playerName: selectedOption.value,
        errorPlayer: ''
      });
      this.props.onChange(selectedOption);
      this.props.onValidate(true);
    } else {
      this.props.onValidate(false);
    }
  };

  verifyPseudo(playerName, callback) {
    if (!playerName || !callback)
      return;
    let parameters = {
      serverName: this.props.server,
      playerName: playerName
    };
    HttpUtils().GET(process.env.REACT_APP_SERVER_URL, ApiEndpoint.SERVER_PlayerExist, parameters, function (data) {
      console.log(data);
      if (data) {
        // only validate on SELECT
        //this.props.onValidate();
        callback([{value: playerName, label: playerName}]);
      } else {
        this.setState({
          errorPlayer: "There is no data for " + parameters.playerName + " on " + parameters.serverName
        });
      }
    }.bind(this), function (errorStatus, error) {
      console.log(error);
      if (errorStatus === 404) {
        // Player suggestion
          let data = JSON.parse(error);
          let suggestions = [];
          for (let i in data) {
            suggestions.push({value: data[i], label: data[i]});
          }
          callback(suggestions);
      } else {
        this.setState({
          errorPlayer: error,
        });
      }
    }.bind(this));
  }

  loadPlayerOptions(inputValue, callback) {
    if (inputValue.length > 2) {
      this.verifyPseudo(inputValue,function (suggestions) {
        callback(suggestions.filter(i =>
          i.label.toLowerCase().includes(inputValue.toLowerCase())
        ));
      });
    } else {
      callback([]);
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <p className="input-title text-muted">Enter a pseudo :</p>
        <CFormInput className="input-body" gui={{headIcon: "fa fa-user-o"}} type={"text"}
                    placeHolder={"Enter the exact pseudo"}
                    error={this.state.errorPlayer || this.props.error} success={!!this.state.playerName}
                    autoComplete={{
                      options: this.state.suggestions,
                      handleSelectChange: this.handlePlayerChange,
                      handleInputChange: this.handlePlayerChange,
                      loadOptions: this.loadPlayerOptions
                    }}/>
      </div>
    );
  }
}

//onChange={this.handlePlayerChange}  verify={this.verifyPseudo}
export default SelectPlayerForm;
