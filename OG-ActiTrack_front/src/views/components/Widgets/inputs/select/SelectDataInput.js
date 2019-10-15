import React from 'react';
import HttpUtils from "../../../../../utils/api/HttpUtils";
import PropTypes from 'prop-types';
import SelectInput from "./SelectInput";
import moment from "moment";

const propTypes = {
  // mandatory
  server: PropTypes.string,
  endpoint: PropTypes.string,
  // data
  nullable: PropTypes.bool,
  apiParameter: PropTypes.object,
  // selectInput
  ...SelectInput.propTypes
};

const defaultProps = {
  nullable: false,
  apiParameter: {},
  ...SelectInput.defaultProps
};

class SelectDataInput extends SelectInput {
  constructor(props) {
    super(props);
    this.initState({
      apiParameter: props.apiParameter,
      isUnmount: false
    });
    this.generateValueOptions = this.generateValueOptions.bind(this);
    this.loadValueOptions = this.loadValueOptions.bind(this);
    if (!(typeof this.formatDataForSelection === "function")
      || !(typeof this.isApiParameterValid === "function")) {
      throw new TypeError("Must override methods.");
    }
    if (!props.server || !props.endpoint) {
      throw new TypeError("Must provide server & endpoint in getAPIUrls()");
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.apiParameter) {
      if (!this.state.apiParameter)
        this.state.apiParameter = {};
      for (let key in nextProps.apiParameter) {
        this.state.apiParameter[key] = nextProps.apiParameter[key];
      }
      this.state.reload =  moment().format('HH:mm:ss');
      this.state.selected = undefined;
      this.state.values = undefined;
    }
    return true;
  }

  componentWillUnmount() {
    this.state.isUnmount = true;
  }

  generateValueOptions(callback) {
    if (!this.isApiParameterValid()) {
      console.log("[SelectDataInput]: The API parameters are incorrect.");
      this.setState({errorValue: "The API parameters are incorrect."});
      return;
    }
    const {server, endpoint} = this.props;
    HttpUtils.GET(server, endpoint, this.state.apiParameter, function (data) {
      if (this.state.isUnmount) {
        return;
      }
      if (data) {
        let formattedData = this.formatDataForSelection(data);
        if (this.props.nullable) {
          formattedData.unshift({label: "", value: null});
        }
        this.setDefaultSelection(formattedData);
        this.setState({values: formattedData, selected: formattedData.length === 1 ? formattedData[0] : undefined});
        if (callback)
          callback(formattedData);
      } else {
        this.setState({
          errorPlayer: "There is no selected registered."
        });
      }
    }.bind(this), function (errorStatus, error) {
      this.setState({
        errorPlayer: error,
      });
    }.bind(this));
  }

  loadValueOptions(inputValue, callback) {
    if (!this.state.values || this.state.values.length === 0 || !inputValue) {
      this.generateValueOptions(function (suggestions) {
        callback(suggestions.filter(i =>
          i.label.toLowerCase().includes(inputValue.toLowerCase())
        ));
      });
    } else {
      callback(this.state.values.filter(i =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
      ));
    }
  }
}

SelectDataInput.propTypes = propTypes;
SelectDataInput.defaultProps = defaultProps;

export default SelectDataInput;
