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
  // data
  nullable: PropTypes.bool,
  selected: PropTypes.string,
  apiParameter: PropTypes.object,
  // style
  title: PropTypes.string,
  placeHolder: PropTypes.string,
  className: PropTypes.string,
  inline: PropTypes.bool,
  muted: PropTypes.bool,
  disabled: PropTypes.bool
};

const defaultProps = {
  selected: '',
  inline: false,
  nullable: false,
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
      isUnmount: false
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.loadValueOptions = this.loadValueOptions.bind(this);
    this.generateValueOptions = this.generateValueOptions.bind(this);
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
      this.state.selected = '';
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
        this.setState({values: formattedData, selected: formattedData.length === 1 ? formattedData[0].label : ''});
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
    if (selectedOption === Object(selectedOption)) {
      this.setState({
        selected: selectedOption.label, errorValue: ''
      });
      this.props.onChange(selectedOption);
    }
  };

  render() {
    const {className, inline, muted, disabled, gui, title, placeHolder} = this.props;
    const {selected, errorValue, apiParameter, values} = this.state;

    return (
      <div className={className}>
        <CFormInput className="input-body" gui={gui}
                    type="text"
                    title={title}
                    inline={inline}
                    muted={muted}
                    disabled={disabled}
                    placeHolder={placeHolder}
                    value={selected} error={errorValue}
                    hackReload={JSON.stringify(apiParameter)}
                    autoComplete={{
                      options: values,
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
