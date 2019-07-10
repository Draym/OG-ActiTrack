import React, {Component} from 'react';
import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormFeedback
} from 'reactstrap';
import TString from "../../../Utils/TString";
import AsyncSelect from 'react-select/async';

class CFormInput extends Component {
  constructor(props) {
    super(props);
    this.loadOptions = this.loadOptions.bind(this);
  }

  loadOptions(inputValue, callback) {
    setTimeout(() => {
      this.props.autoComplete.loadOptions(inputValue, callback);
    }, 1000);
  };

  render() {
    let renderIconBorder = function (data, type) {
      return (
        <InputGroupAddon addonType={type}>
          <InputGroupText>
            <i className={data}/>
          </InputGroupText>
        </InputGroupAddon>
      );
    };
    let renderTextBorder = function (data, type) {
      return (
        <InputGroupAddon addonType={type}>
          <InputGroupText>
            <span>{data}</span>
          </InputGroupText>
        </InputGroupAddon>
      );
    };
    let renderInputHead = function (gui) {
      if (gui.headIcon) {
        return renderIconBorder(gui.headIcon, "prepend");
      } else if (gui.headText) {
        return renderTextBorder(gui.headText, "prepend");
      }
    };
    let renderInputBack = function (gui) {
      if (gui.backIcon) {
        return renderIconBorder(gui.backIcon, "append");
      } else if (gui.backText) {
        return renderTextBorder(gui.backText, "append");
      }
    };

    let renderVerify = function (verify, success, error) {
      if (verify) {
        return (
          <InputGroupAddon addonType="append">
            <InputGroupText className={"input-verification " + (TString.isNull(error)? "" : "input-error")}>
              <button type="button" className="form-control input-addon" onClick={verify}>
                <i className={(TString.isNull(error)? (TString.isNull(success) ? "icon-arrow-right-circle" : "icon-check") : "icon-close") + " icons font-1x2"} style={{color: "grey"}}/>
              </button>
            </InputGroupText>
          </InputGroupAddon>
        );
      }
      return null;
    };
    let render = function (gui, type, placeHolder, autoComplete, value, onChange, success, error, verify) {
      if (!autoComplete) {
        if (!TString.isNull(error)) {
          return (
            <InputGroup>
              {renderInputHead(gui)}
              <Input type={type} invalid placeholder={placeHolder} autoComplete={autoComplete}
                     value={value} onChange={onChange}/>
              {renderInputBack(gui)}
              {renderVerify(verify, success, error)}
              <FormFeedback>{error}</FormFeedback>
            </InputGroup>
          );
        } else {
          return (
            <InputGroup>
              {renderInputHead(gui)}
              <Input type={type} placeholder={placeHolder} autoComplete={autoComplete}
                     value={value} onChange={onChange}/>
              {renderInputBack(gui)}
              {renderVerify(verify, success, error)}
            </InputGroup>
          );
        }
      } else {
        return (
          <InputGroup>
            {renderInputHead(gui)}
            <AsyncSelect className="input-fill input-addon"
                         cacheOptions
                         loadOptions={this.loadOptions}
                         defaultOptions
                         onChange={autoComplete.handleSelectChange}
                         onInputChange={autoComplete.handleInputChange}
                         placeholder={placeHolder}
                         theme={theme => ({
                           ...theme,
                           borderRadius: 0,
                           colors: {
                             ...theme.colors,
                             primary25: '#DEEBFF',
                             primary: '#B2D4FF',
                           }})}
            />
            {renderInputBack(gui)}
            {renderVerify(verify, success, error)}
          </InputGroup>
        );
      }
    }.bind(this);
    return (
      <div>
        {render(this.props.gui, this.props.type, this.props.placeHolder, this.props.autoComplete, this.props.value, this.props.onChange, this.props.success, this.props.error, this.props.verify)}
      </div>
    );
  }
}

export default CFormInput;
