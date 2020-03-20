import React from 'react';

import HttpUtils from "../../../../../utils/api/HttpUtils";
import CFormInput from "../../../CFormInput";
import CComponent from "../../../CComponent";
import PropTypes from 'prop-types';
import TLogs from "../../../../../utils/TLogs";

const propTypes = {
  // mandatory
  server: PropTypes.string,
  endpoint: PropTypes.string,
  //controls
  onChange: PropTypes.func,
  // data
  selected: PropTypes.string,
  apiParameter: PropTypes.object,
  // style
  title: PropTypes.string,
  placeHolder: PropTypes.string,
  className: PropTypes.string,
};

const defaultProps = {
  selected: '',
  apiParameter: {}
};

class SelectDataInput extends CComponent {
  constructor(props) {
    super(props);
    this.state = {
      values: undefined,
      selected: props.selected,
      errorValue: '',
      apiParameter: props.apiParameter,
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.loadValueOptions = this.loadValueOptions.bind(this);
    this.generateValueOptions = this.generateValueOptions.bind(this);
    if (!(typeof this.formatDataForSelection === "function")
      || !(typeof this.isApiParameterValid === "function")) {
      throw new TypeError("Must override method");
    }
    if (!props.endpoint) {
      throw new TypeError("Must provide an endpoint in getAPIUrls()");
    }
  }

  componentWillUpdate(nextProps, nextState){
    if (nextProps.apiParameter) {
      if (!this.state.apiParameter)
        this.state.apiParameter = {};
      for (let key in nextProps.apiParameter) {
        this.state.apiParameter[key] = nextProps.apiParameter[key];
      }
    }
    return true;
  }

  generateValueOptions(callback) {
    if (!this.isApiParameterValid()) {
      TLogs.p("[SelectDataInput]: The API parameters are incorrect.");
      this.setState({errorValue: "The API parameters are incorrect."});
      return;
    }
    const {server, endpoint} = this.props;
    HttpUtils.GET(server, endpoint, this.state.apiParameter, function (data) {
      if (data) {
        let formattedData = this.formatDataForSelection(data);
        this.setState({values: formattedData});
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

  handleValueChange = selectedOption => {
    if (selectedOption.label) {
      this.setState({
        selected: selectedOption.label, errorValue: ''
      });
      this.props.onChange(selectedOption);
    }
  };

  render() {
    const {className, gui, title, placeHolder} = this.props;

    TLogs.p("Selected: ", this.state.selected);
    return (
      <div className={className}>
        <CFormInput className="input-body" gui={gui}
                    type="text"
                    title={title}
                    placeHolder={placeHolder}
                    value={this.state.selected} error={this.state.errorValue}
                    hackReload={JSON.stringify(this.state.apiParameter)}
                    autoComplete={{
                      options: this.state.values,
                      handleSelectChange: this.handleValueChange,
                      handleInputChange: this.handleValueChange,
                      loadOptions: this.loadValueOptions
                    }}/>
      </div>
    );
  }
}

SelectDataInput.defaultProps = defaultProps;
SelectDataInput.propTypes = propTypes;

export default SelectDataInput;
