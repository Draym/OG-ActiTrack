import React, {Component} from 'react';
import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormFeedback
} from 'reactstrap';
import TString from "../../../Utils/TString";

class CFormInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let renderInput = function (icon, type, placeHolder, autoComplete, value, onChange, error) {
      if (!TString.isNull(error)) {
        return (
          <InputGroup className="mb-4">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className={icon}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type={type} invalid placeholder={placeHolder} autoComplete={autoComplete}
                   value={value} onChange={onChange}/>
            <FormFeedback>{error}</FormFeedback>
          </InputGroup>
        );
      } else {
        return (
          <InputGroup className="mb-4">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className={icon}/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type={type} placeholder={placeHolder} autoComplete={autoComplete}
                   value={value} onChange={onChange}/>
          </InputGroup>
        );
      }
    }.bind(this);
    return (
      <div>
        {renderInput(this.props.icon, this.props.type, this.props.placeHolder, this.props.autoComplete, this.props.value, this.props.onChange, this.props.error)}
      </div>
    );
  }
}

export default CFormInput;
