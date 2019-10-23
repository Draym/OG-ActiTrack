import React, {Component} from 'react';
import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormFeedback
} from 'reactstrap';
import TString from "../../../utils/TString";
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';
import COptionalCol from "../COptionalCol";
import COptionalTitle from "../COptionalTitle";

const propTypes = {
  // style
  title: PropTypes.string,
  gui: PropTypes.object,
  type: PropTypes.string,
  placeHolder: PropTypes.string,
  autoComplete: PropTypes.object,
  value: PropTypes.any,
  inline: PropTypes.bool,
  muted: PropTypes.bool,
  col: PropTypes.number,
  disabled: PropTypes.bool,
  editable: PropTypes.bool,
  // controls
  dataKey: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onVerify: PropTypes.func,
  // result
  success: PropTypes.bool,
  error: PropTypes.string,
  hackReload: PropTypes.any // if it changes the component will force reload using key
};

const defaultProps = {
  editable: true,
  inline: false
};

class CFormInput extends Component {
  constructor(props) {
    super(props);
    this.loadOptions = this.loadOptions.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  loadOptions(inputValue, callback) {
    setTimeout(() => {
      this.props.autoComplete.loadOptions(inputValue, callback);
    }, 1000);
  };

  onChange(event) {
    if (!this.props.editable) {
      event.preventDefault();
      return;
    }
    let triggerOnChange = (this.props.autoComplete ? this.props.autoComplete.handleSelectChange : this.props.onChange);
    if (this.props.dataKey) {
      let data = {};
      data[this.props.dataKey] = event.target.value;
      triggerOnChange(data);
    } else {
      triggerOnChange(event);
    }
  }

  render() {
    const {title, gui, inline, muted, type, placeHolder, autoComplete, value, onClick, success, error, onVerify, hackReload, disabled, col, className, editable} = this.props;
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
    let renderInputHead = function () {
      if (!gui)
        return;
      if (gui.headIcon) {
        return renderIconBorder(gui.headIcon, "prepend");
      } else if (gui.headText) {
        return renderTextBorder(gui.headText, "prepend");
      }
    };
    let renderInputBack = function () {
      if (!gui)
        return;
      if (gui.backIcon) {
        return renderIconBorder(gui.backIcon, "append");
      } else if (gui.backText) {
        return renderTextBorder(gui.backText, "append");
      }
    };

    let renderVerify = function () {
      if (onVerify) {
        return (
          <InputGroupAddon addonType="append">
            <InputGroupText className={"input-verification " + (TString.isNull(error) ? "" : "input-error")}>
              <button type="button" className="form-control input-addon" onClick={onVerify}>
                <i
                  className={(TString.isNull(error) ? (!success ? "icon-arrow-right-circle" : "icon-check") : "icon-close") + " icons font-1x2"}
                  style={{color: "grey"}}/>
              </button>
            </InputGroupText>
          </InputGroupAddon>
        );
      }
      return null;
    };
    let render = function () {
      if (!autoComplete) {
        return (
          <Input className={(!editable ? "not-editable" : "")} type={type} invalid={!!error}
                 placeholder={placeHolder} autoComplete={autoComplete}
                 value={value} onChange={this.onChange}
                 disabled={disabled} onClick={onClick}/>
        );
      } else {
        return (
          <AsyncSelect key={hackReload}
                       className={"input-fill input-addon" + (!editable ? "not-editable" : "")}
                       cacheOptions
                       defaultValue={value}
                       loadOptions={this.loadOptions}
                       defaultOptions
                       disabled={disabled}
                       onChange={this.onChange}
                       onClick={onClick}
                       onInputChange={autoComplete.handleInputChange}
                       placeholder={placeHolder}
                       theme={theme => ({
                         ...theme,
                         borderRadius: 0,
                         colors: {
                           ...theme.colors,
                           primary25: '#DEEBFF',
                           primary: '#B2D4FF',
                         }
                       })}
          />
        );
      }
    }.bind(this);
    return (
      <COptionalCol col={col} className={className}>
        <COptionalTitle inline={inline} title={title} muted={muted}>
          <InputGroup>
            {renderInputHead(gui)}
            {render()}
            {renderInputBack(gui)}
            {renderVerify(onVerify, success, error)}
            {error && <FormFeedback>{error}</FormFeedback>}
          </InputGroup>
        </COptionalTitle>
      </COptionalCol>
    );
  }
}

CFormInput.defaultProps = defaultProps;
CFormInput.propTypes = propTypes;

export default CFormInput;
