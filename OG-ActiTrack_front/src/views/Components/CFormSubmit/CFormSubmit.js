import React, {Component} from 'react';
import {
  Card,
  CardHeader,
  CardBody
} from "reactstrap/es";
import {Col, FormFeedback, InputGroup, Row} from "reactstrap";
import CButtonLoading from "../CButton/CButtonLoading";
import HttpUtils from "../../../Utils/HttpUtils";

class CFormSubmit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      disabled: true,
      error: null,
      data: {}
    };
    this.submit = this.submit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkRequirement = this.checkRequirement.bind(this);

    if (!this.props.endpoint)
      throw new TypeError("Must provide a submit endpoint.");
  }

  submit() {
    this.setState({loading: true});
    HttpUtils().GET(process.env.REACT_APP_SERVER_URL, this.props.endpoint, this.state.data, function (data) {
      if (data) {

      } else {
        this.setState({
          error: "There is no data on server for that request.",
          loading: false
        });
      }
    }.bind(this), function (errorStatus, error) {
      console.log(error);
      this.setState({
        error: error,
        loading: false
      });
    }.bind(this));
  }

  checkRequirement() {
    console.log("check: ", this.state);
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
    this.setState({data: newData, error: null}, function () {
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
    let drawError = function () {
      if (this.state.error)
        return (
          <Row>
            <Col>
              <FormFeedback>{this.state.error}</FormFeedback>
            </Col>
          </Row>
        )
    }.bind(this);
    let drawDesc = function () {
      if (this.props.desc)
        return (
          <Row>
            <Col>
              <span>{this.props.desc}</span>
            </Col>
          </Row>
        )
    }.bind(this);
    return (
      <Card>
        {drawHeader()}
        <CardBody>
          {drawDesc()}
          <Row>
            <Col md={this.props.col ? this.props.col : 12}>
              {React.Children.map(this.props.children, (child, i) => {
                return (<Row className="parameter-bloc">
                  <Col>
                    {React.cloneElement(child, {onChange: this.handleInputChange})}
                  </Col>
                </Row>)
              })}
            </Col>
          </Row>
          {drawError()}
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

export default CFormSubmit;
