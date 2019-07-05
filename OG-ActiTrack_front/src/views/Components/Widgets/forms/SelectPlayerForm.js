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

  }

  handlePlayerChange(event) {
    this.setState({
      playerName: event.target.value, errorPlayer: ''
    });
    this.props.onChange(event.target.value);
  }

  verifyPseudo() {
    let parameters = {
      serverName: this.props.server,
      playerName: this.state.playerName
    };
    HttpUtils().GET(process.env.REACT_APP_SERVER_URL, ApiEndpoint.SERVER_PlayerExist, parameters, function (data) {
      console.log(data);
      if (data) {
        this.props.onValidate();
      } else {
        this.setState({
          errorPlayer: "There is no data for " + parameters.playerName + " on " + parameters.serverName
        });
      }
    }.bind(this), function (errorStatus, error) {
      console.log(error);
      if (errorStatus !== 404) {
        this.setState({
          errorPlayer: error,
        });
      }
      // TODO: add player suggestion
    }.bind(this));
  }

  render() {
    return (
      <div className={this.props.className}>
        <p className="input-title text-muted">Enter a pseudo :</p>
        <CFormInput className="input-body" gui={{headIcon: "fa fa-user-o"}} type={"text"} placeHolder={"Enter the exact pseudo"}
                    value={this.state.playerName} onChange={this.handlePlayerChange}
                    error={this.state.errorPlayer || this.props.error} verify={this.verifyPseudo}/>
      </div>
    );
  }
}

export default SelectPlayerForm;
