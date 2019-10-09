import React, {Component} from 'react';
import PropTypes from "prop-types";
import CFormInput from "../CFormInput";
import {Row, Col} from "reactstrap/es";
import {Button} from "reactstrap";
import TString from "../../../utils/TString";

const propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func,
};
const defaultProps = {
  data: {}
};

class CDataModelCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tmpKey: "",
      tmpValue: "",
      inputs: this.dataToInputs(props.data)
    };
    this.onTmpKeyChange = this.onTmpKeyChange.bind(this);
    this.onTmpValueChange = this.onTmpValueChange.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onKeyUpdate = this.onKeyUpdate.bind(this);
    this.onValueUpdate = this.onValueUpdate.bind(this);
    this.inputsToData = this.inputsToData.bind(this);
  }

  dataToInputs(data) {
    let result = [];
    for (let key in data) {
      result.push({key: key, value: data[key]});
    }
    return result;
  }

  inputsToData() {
    let result = {};
    for (let i in this.state.inputs) {
      result[this.state.inputs[i].key] = this.state.inputs[i].value;
    }
    return result;
  }

  onChange() {
    if (this.props.onChange) {
      this.props.onChange(this.inputsToData());
    }
  }

  onAdd() {
    if (TString.isNull(this.state.tmpKey))
      return;
    let inputs = this.state.inputs;
    inputs.push({key: this.state.tmpKey, value: this.state.tmpValue});
    this.setState({
      inputs: inputs,
      tmpKey: "",
      tmpValue: ""
    });
    this.onChange();
  }

  onDelete(i) {
    let inputs = this.state.inputs;
    inputs.splice(i, 1);
    this.setState({
      inputs: inputs
    });
    this.onChange();
  }

  onKeyUpdate(i, newKey) {
    if (TString.isNull(newKey))
      return;
    let inputs = this.state.inputs;
    inputs[i].key = newKey;
    this.setState({
      inputs: inputs
    });
    this.onChange();
  }

  onValueUpdate(i, value) {
    let inputs = this.state.inputs;
    inputs[i].value = value;
    this.setState({
      inputs: inputs
    });
    this.onChange();
  }

  onTmpKeyChange(selected) {
    this.setState({
      tmpKey: selected.target.value
    });
  }

  onTmpValueChange(selected) {
    this.setState({
      tmpValue: selected.target.value
    });
  }

  render() {
    const {tmpKey, tmpValue, inputs} = this.state;
    const {onAdd, onDelete, onKeyUpdate, onValueUpdate, onTmpKeyChange, onTmpValueChange} = this;
    return (
      <div>
        {
          inputs.map((obj, i) => (
              <Row key={i}>
                <Col xs={5} sm={5} md={5} lg={3} xl={3}>
                  <CFormInput type={"text"} placeHolder={"enter key"}
                              value={obj.key} onChange={selected => {
                    onKeyUpdate(i, selected.target.value)
                  }}/>
                </Col>
                <span>:</span>
                <Col xs={5} sm={5} md={5} lg={3} xl={3}>
                  <CFormInput type={"text"} placeHolder={"enter value"}
                              value={obj.value} onChange={selected => {
                    onValueUpdate(i, selected.target.value)
                  }}/>
                </Col>
                <Button className="pop-btn"
                        onClick={() => onDelete(i)}>
                  <i className="icon-trash"/>
                </Button>
              </Row>
            )
          )
        }
        <Row>
          <Col xs={4} sm={4} md={4} lg={3} xl={3}>
            <CFormInput type={"text"} placeHolder={"enter key"}
                        value={tmpKey} onChange={onTmpKeyChange}/>
          </Col>
          <span>:</span>
          <Col xs={4} sm={4} md={4} lg={3} xl={3}>
            <CFormInput type={"text"} placeHolder={"enter value"}
                        value={tmpValue} onChange={onTmpValueChange}/>
          </Col>
          <Col xs={2} sm={2} md={2} lg={2} xl={2}>
            <Button color="info" onClick={onAdd}>Add value</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

CDataModelCreator.defaultProps = defaultProps;
CDataModelCreator.propTypes = propTypes;

export default CDataModelCreator;
