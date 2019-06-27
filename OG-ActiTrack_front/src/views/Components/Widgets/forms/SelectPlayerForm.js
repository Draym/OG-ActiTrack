import React, {Component} from 'react';

import HttpUtils from "../../../../Utils/HttpUtils";
import CFormInput from "../../CFormInput";
import {ApiEndpoint} from "../../../../Utils/ApiEndpoint";

class SelectPlayerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: '',
      errorPlayer: ''
    };
    this.handlePlayerChange = this.handlePlayerChange.bind(this);
    this.verifyPseudo = this.verifyPseudo.bind(this);

  }

  handlePlayerChange(event) {
    this.setState({
      player: event.target.value, errorPlayer: ''
    });
    this.props.onChange(event.target.value);
  }

  verifyPseudo() {
    let parameters = {
      server: this.props.server,
      player: this.state.player
    };
    HttpUtils().GET(process.env.REACT_APP_SERVER_URL, ApiEndpoint.DATA_PlayerExistInServer, parameters, function (data) {
      console.log(data);
      if (data) {
        this.props.onValidate();
      } else {
        this.setState({
          errorPlayer: "There is no data for " + parameters.player + " on " + parameters.server
        });
      }
    }.bind(this), function (errorStatus, error) {
      console.log(error);
      this.setState({
        errorPlayer: error,
      });
    }.bind(this));
  }

  render() {
    return (
      <div>
        <p className="input-title text-muted">Enter a pseudo :</p>
        <CFormInput className="input-body" gui={{headIcon: "fa fa-user-o"}} type={"text"} placeHolder={"Pseudo"}
                    value={this.state.player} onChange={this.handlePlayerChange}
                    error={this.state.errorPlayer} verify={this.verifyPseudo}/>
      </div>
    );
  }
}

export default SelectPlayerForm;
