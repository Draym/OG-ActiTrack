import React, {Component} from 'react';
import {
  Card,
  CardHeader,
  CardBody
} from "reactstrap/es";
import {Col, Row} from "reactstrap";
import CButtonLoading from "../CButton/CButtonLoading";
import HttpUtils from "../../../utils/api/HttpUtils";
import CBlocError from "../CBlocError";
import CBlocSuccess from "../CBlocSuccess";
import PropTypes from 'prop-types';
import CBlockTitle from "../CBlockTitle/CBlockTitle";
import TLogs from "../../../utils/TLogs";
import THttp from "../../../utils/api/THttp";

const propTypes = {
  endpoint: PropTypes.string,
  verification: PropTypes.func,
  success: PropTypes.func,
  requirements: PropTypes.array,
  title: PropTypes.string,
  desc: PropTypes.string,
  col: PropTypes.number,
  submitType: PropTypes.string,
  submitTitle: PropTypes.string,
  httpMethod: PropTypes.string,
  resErrorMsg: PropTypes.string,
  resSuccessMsg: PropTypes.string
};
const defaultProps = {
  httpMethod: "PUT",
  resErrorMsg: "There is no data on server for that request.",
  resSuccessMsg: "Your data have been updated successfully."
};

class CFormSubmit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      disabled: true,
      error: null,
      success: null,
      data: {}
    };
    this.submit = this.submit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkRequirement = this.checkRequirement.bind(this);

    React.Children.map(this.props.children, (child) => {
      if (child.props.defaultValue && child.props.dataKey)
        this.state.data[child.props.dataKey] = child.props.defaultValue;
    });
    if (!this.props.endpoint)
      throw new TypeError("Must provide a submit endpoint.");
  }

  submit() {
    if (this.props.verification && !this.props.verification(this.state)) {
      this.setState({
        error: "The form is invalid.",
        success: null
      });
      return;
    }
    let httpMethod = THttp.getMethod(this.props.httpMethod);
    if (!httpMethod) {
      this.setState({
        error: "Wrong Http method",
        success: null
      });
    }
    this.setState({loading: true});

    httpMethod(null, this.props.endpoint, this.state.data, function (data) {
      this.setState({
        error: (!data ? this.props.resErrorMsg : null),
        success: (data ? this.props.resSuccessMsg : null),
        loading: false
      });
      if (data && this.props.success && typeof this.props.success === "function")
        this.props.success(data);
    }.bind(this), function (errorStatus, error) {
      TLogs.p(error);
      this.setState({
        error: error,
        success: null,
        loading: false
      });
    }.bind(this));
  }

  checkRequirement() {
    if (this.props.requirements && this.props.requirements.length > 0) {
      for (let i in this.props.requirements) {
        if (!this.state.data[this.props.requirements[i]]) {
          this.setState({disabled: true});
          return;
        }
      }
    }
    this.setState({disabled: false});
  }

  handleInputChange(data) {
    let newData = this.state.data;
    for (let id in data) {
      newData[id] = data[id];
    }
    this.setState({data: newData, error: null, success: null}, function () {
      this.checkRequirement();
    }.bind(this));
  }

  render() {
    let drawHeader = function () {
      if (this.props.title)
        return (
          <CardHeader>{this.props.title}</CardHeader>
        )
    }.bind(this);
    return (
      <Card>
        {drawHeader()}
        <CardBody>
          <CBlockTitle text={this.props.desc} muted={false}/>
          <Row>
            <Col md={this.props.col ? this.props.col : 12}>
              {React.Children.map(this.props.children, (child, i) => {
                return (<Row className={i > 0 ? "parameter-bloc" : ""}>
                  <Col>
                    {React.cloneElement(child, {
                      onChange: this.handleInputChange,
                      value: child.props.dataKey ? this.state.data[child.props.dataKey] : child.props.defaultValue,
                      editable: !!child.props.dataKey
                    })}
                  </Col>
                </Row>)
              })}
            </Col>
          </Row>
          <CBlocError error={this.state.error} className="mt-2"/>
          <CBlocSuccess value={this.state.success} className="mt-2"/>
          <Row className="parameter-bloc">
            <Col>
              <CButtonLoading color={this.props.submitType ? this.props.submitType : "primary"}
                              onClick={this.submit}
                              loading={this.state.loading}
                              disabled={this.state.disabled}
                              className="float-right"
                              text={this.props.submitTitle ? this.props.submitTitle : 'Submit'}
                              loadingText="Submitting"/>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  };
}

CFormSubmit.defaultProps = defaultProps;
CFormSubmit.propTypes = propTypes;

export default CFormSubmit;
