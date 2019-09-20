import React from 'react';

import HttpUtils from "../../../../../utils/api/HttpUtils";
import CFormInput from "../../../CFormInput";
import CComponent from "../../../CComponent";
import PropTypes from 'prop-types';

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
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.loadValueOptions = this.loadValueOptions.bind(this);
    this.generateValueOptions = this.generateValueOptions.bind(this);
    if (!(typeof this.formatDataForSuggestions === "function")
      || !(typeof this.isApiParameterValid === "function")
      || !(typeof this.searchKey === "function")) {
      throw new TypeError("Must override methods.");
    }
    if (!props.server || !props.endpoint) {
      throw new TypeError("Must provide server & endpoint in getAPIUrls().");
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

  generateValueOptions(value, callback) {
    if (!value || !callback)
      return;
    if (!this.isApiParameterValid()) {
      console.log("[SelectDataInput]: The API parameters are incorrect.");
      this.setState({errorValue: "The API parameters are incorrect."});
      return;
    }
    const {server, endpoint} = this.props;
    let parameters = this.state.apiParameter;
    parameters[this.searchKey()] = value;
    HttpUtils.GET(server, endpoint, parameters, function (data) {
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
        let data = JSON.parse(error);
        let suggestions = this.formatDataForSuggestions(data);
        callback(suggestions);
      } else {
        this.setState({
          errorValue: error,
        });
      }
    }.bind(this));
  }

  loadValueOptions(inputValue, callback) {
    if (inputValue.length > 2) {
      this.generateValueOptions(inputValue, function (suggestions) {
        console.log("Suggestions: ", suggestions);
        callback(suggestions.filter(i =>
          i.label.toLowerCase().includes(inputValue.toLowerCase())
        ));
      });
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
      this.props.onChange(selectedOption);
      this.props.onValidate(true);
    } else if (selectedOption) {
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
