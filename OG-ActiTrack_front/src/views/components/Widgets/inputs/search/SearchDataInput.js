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
  onValidate: PropTypes.func,
  // data
  apiParameter: PropTypes.object,
  // style
  title: PropTypes.string,
  placeHolder: PropTypes.string,
  className: PropTypes.string,
};

const defaultProps = {
  apiParameter: {}
};

class SearchDataInput extends CComponent {
  constructor(props) {
    super(props);
    this.state = {
      values: undefined,
      selected: undefined,
      errorValue: '',
      apiParameter: props.apiParameter,
      isUnmount: false
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.loadValueOptions = this.loadValueOptions.bind(this);
    this.generateValueOptions = this.generateValueOptions.bind(this);
    if (!(typeof this.formatDataForSuggestions === "function")
      || !(typeof this.isApiParameterValid === "function")
      || !(typeof this.searchKey === "function")) {
      throw new TypeError("Must override methods.");
    }
    if (!props.endpoint) {
      throw new TypeError("Must an endpoint in getAPIUrls().");
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.apiParameter) {
      if (!this.state.apiParameter)
        this.state.apiParameter = {};
      for (let key in nextProps.apiParameter) {
        this.state.apiParameter[key] = nextProps.apiParameter[key];
      }
    }
    return true;
  }

  componentWillUnmount() {
    this.state.isUnmount = true;
  }

  generateValueOptions(value, callback) {
    if (!value || !callback)
      return;
    if (!this.isApiParameterValid()) {
      TLogs.p("[SelectDataInput]: The API parameters are incorrect.");
      this.setState({errorValue: "The API parameters are incorrect."});
      return;
    }
    const {server, endpoint} = this.props;
    let parameters = this.state.apiParameter;
    parameters[this.searchKey()] = value;
    HttpUtils.GET(server, endpoint, parameters, function (data) {
      if (this.state.isUnmount) {
        return;
      }
      if (data) {
        if (callback)
          callback([{value: data, label: value}]);
      } else {
        this.setState({
          errorPlayer: "There is no selection registered."
        });
      }
    }.bind(this), function (errorStatus, error) {
      if (errorStatus === 404) {
        // Suggestions
        let suggestions = this.formatDataForSuggestions(error);
        callback(suggestions);
      } else {
        this.setState({
          errorValue: error,
        });
      }
    }.bind(this));
  }

  loadValueOptions(inputValue, callback) {
    if (inputValue.length > 1) {
      if (this.timeout) {
        window.clearTimeout(this.timeout);
      }
      this.timeout = window.setTimeout(() => {
        this.generateValueOptions(inputValue, function (suggestions) {
          TLogs.p("Suggestions: ", suggestions);
          callback(suggestions.filter(i =>
            i.label ? i.label.toLowerCase().includes(inputValue.toLowerCase()) : false
          ));
        });
      }, 400);
    } else {
      callback([]);
    }
  }

  handleValueChange = selectedOption => {
    if (selectedOption.label) {
      this.setState({
        selected: selectedOption.label,
        errorValue: ''
      });
      this.props.onChange(selectedOption.value);
      this.props.onValidate(true);
    } else {
      this.props.onValidate(false);
    }
  };

  render() {
    const {className, gui, title, placeHolder} = this.props;

    return (
      <div className={className}>
        <CFormInput className="input-body" gui={gui}
                    type="text"
                    title={title}
                    placeHolder={placeHolder}
                    value={this.state.selected}
                    error={this.state.errorValue}
                    success={!!this.state.selected}
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

SearchDataInput.defaultProps = defaultProps;
SearchDataInput.propTypes = propTypes;

export default SearchDataInput;
