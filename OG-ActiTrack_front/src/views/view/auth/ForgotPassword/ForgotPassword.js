import React, {Component} from 'react';
import {
  Button,
  Card,
  CardBody, CardHeader,
  Col,
  Container,
  Form,
  Row
} from 'reactstrap';
import HttpUtils from "../../../../utils/api/HttpUtils";
import TString from "../../../../utils/TString";
import CBlocError from "../../../components/CBlocError";
import CFormInput from "../../../components/CFormInput";
import '../custom.css';
import './forgotPassword.css';
import {ApiEndpoint} from "../../../../utils/api/ApiEndpoint";
import {RoutesEndpoint} from "../../../../utils/RoutesEndpoint";
import CBlockTitle from "../../../components/CBlockTitle/CBlockTitle";
import TLogs from "../../../../utils/TLogs";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errorEmail: '',
      errorMessage: '',
      jobIsDone: false
    };
    this.triggerForgotPassword = this.triggerForgotPassword.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.triggerHome = this.triggerHome.bind(this);
  }


  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  triggerForgotPassword(event) {
    event.preventDefault();
    TLogs.p("Forgot", this.state);
    if (TString.isNull(this.state.email)) {
      this.setState({
        errorEmail: 'Please enter an email.'
      });
      return;
    }
    let data = {
      'email': this.state.email
    };
    HttpUtils.GET(null, ApiEndpoint.AUTH_ForgotPassword, data, function (data) {
      if (data) {
        this.setState({jobIsDone: true})
      }
    }.bind(this), function (errorStatus, error) {
      TLogs.p(error);
      this.setState({
        errorMessage: error
      });
    }.bind(this));
  }

  triggerHome() {
    this.props.history.push(RoutesEndpoint.HOME);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value, errorEmail: ''});
  }

  render() {
    let drawState = function () {
      if (!this.state.jobIsDone) {
        return (
          <Card className="mx-4">
            <CardBody className="p-4">
              <Form>
                <h2>Did you forget your password?</h2>
                <CBlockTitle text={"please enter your email"}/>
                <CFormInput gui={{headIcon: "icon-user"}} type={"text"} placeHolder={"Email"}
                            value={this.state.email} onChange={this.handleEmailChange}
                            error={this.state.errorEmail}/>
                <Button className="mt-2" color="primary" type="submit" block onClick={this.triggerForgotPassword}>Send me a
                  verification email</Button>
              </Form>
            </CardBody>
            <CBlocError error={this.state.errorMessage}/>
          </Card>
        );
      } else {
        return (
          <Card className="card-accent-info">
            <CardHeader>
              An email has been sent to {this.state.email}
            </CardHeader>
            <CardBody className="p-4 validate-bloc">
              <h6>Please verify your email, you will find a secure link which will allow you to change your
                password.</h6>
              <Row className="justify-content-center">
                <Button color="secondary" className="px-4" type="button"
                        onClick={this.triggerHome}>Back to Home</Button>
              </Row>
            </CardBody>
          </Card>
        );
      }
    }.bind(this);
    return (
      <div className="flex-row align-items-center">
        <Container style={{'marginTop': 7 + 'em'}}>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              {drawState()}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ForgotPassword;
