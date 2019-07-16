import React, {Component, Suspense} from 'react';
import {
  Button,
  Card,
  CardBody, CardHeader,
  Col,
  Container,
  Form,
  Row
} from 'reactstrap';
import {AppFooter, AppHeader} from "@coreui/react";
import AuthHeader from '../../../Containers/AuthLayout/AuthHeader';
import AuthFooter from '../../../Containers/AuthLayout/AuthFooter';
import HttpUtils from "../../../../Utils/HttpUtils";
import TString from "../../../../Utils/TString";
import CFormInput from "../../../Components/CFormInput";
import CBlocError from "../../../Components/CBlocError";
import '../custom.css';
import './register.css';
import {ApiEndpoint} from "../../../../Utils/ApiEndpoint";
import CButtonLoading from "../../../Components/CButton/CButtonLoading";
import {RoutesEndpoint} from "../../../../Utils/RoutesEndpoint";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobIsDone: false,
      email: '',
      username: '',
      password: '',
      passwordVerify: '',
      errorEmail: '',
      errorUsername: '',
      errorPassword: '',
      errorVerifyPassword: '',
      errorMessage: '',
      loading: {
        registerAccount: false
      }
    };
    this.triggerHome = this.triggerHome.bind(this);
    this.triggerRegister = this.triggerRegister.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordVerifyChange = this.handlePasswordVerifyChange.bind(this);
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  triggerRegister(event) {
    event.preventDefault();
    this.setState({loading: {registerAccount: true}});
    console.log("Register", this.state);
    if (TString.isNull(this.state.password) || TString.isNull(this.state.email) || TString.isNull(this.state.username)) {
      this.setState({
        errorEmail: (TString.isNull(this.state.email) ? 'Please enter an email.' : ''),
        errorUsername: (TString.isNull(this.state.username) ? 'Please enter an username.' : ''),
        errorPassword: (TString.isNull(this.state.password) ? 'Please enter a password.' : ''),
        loading: {registerAccount: false}
      });
      return;
    }
    if (this.state.password !== this.state.passwordVerify) {
      this.setState({
        errorVerifyPassword: "The verification password does't match with the password.",
        loading: {registerAccount: false}
      });
      return;
    }
    console.log("fetch");
    let auth = {
      'email': this.state.email,
      'pseudo': this.state.username,
      'password': this.state.password
    };
    HttpUtils().POST(process.env.REACT_APP_SERVER_URL, ApiEndpoint.AUTH_Register, auth, function (data) {
      if (data) {
        this.setState({
          jobIsDone: true,
          loading: {registerAccount: false}
        });
      }
    }.bind(this), function (errorStatus, error) {
      if (!error)
        return;
      this.setState({
        errorEmail: (error.indexOf("email") !== -1 ? error : ''),
        errorUsername: (error.indexOf("pseudo") !== -1 ? error : ''),
        errorMessage: (error.indexOf("email") === -1 && error.indexOf("pseudo") === -1 ? error : ''),
        loading: {registerAccount: false}
      });
    }.bind(this));
  }

  triggerHome() {
    this.props.history.push(RoutesEndpoint.HOME);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value, errorEmail: ''});
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value, errorUsername: ''});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value, errorPassword: ''});
  }

  handlePasswordVerifyChange(event) {
    this.setState({passwordVerify: event.target.value, errorPasswordVerify: ''});
  }

  render() {
    let drawState = function () {
      if (!this.state.jobIsDone) {
        return (
          <Card className="mx-4">
            <CardBody className="p-5">
              <Form>
                <h1>Register</h1>
                <p className="text-muted">Create your account</p>
                <CFormInput gui={{headIcon: "icon-user"}} type={"text"} placeHolder={"Username"}
                            value={this.state.username} onChange={this.handleUsernameChange}
                            error={this.state.errorUsername}/>
                <CFormInput gui={{headIcon: "fa fa-at"}} type={"text"} placeHolder={"Email"}
                            value={this.state.email} onChange={this.handleEmailChange} error={this.state.errorEmail}/>
                <CFormInput gui={{headIcon: "icon-lock"}} type={"password"} placeHolder={"Password"}
                            value={this.state.password} onChange={this.handlePasswordChange}
                            error={this.state.errorPassword}/>
                <CFormInput gui={{headIcon: "icon-lock"}} type={"password"} placeHolder={"Repeat Password"}
                            value={this.state.passwordVerify} onChange={this.handlePasswordVerifyChange}
                            error={this.state.errorVerifyPassword}/>
                <CButtonLoading color="success" block onClick={this.triggerRegister}
                                loading={this.state.loading.registerAccount}
                                text="Create Account"
                                loadingText="Creating your account"/>
              </Form>
            </CardBody>
            <CBlocError error={this.state.errorMessage}/>
          </Card>
        );
      } else {
        return (
          <Card className="card-accent-info">
            <CardHeader>
              You have successfully registered
            </CardHeader>
            <CardBody className="p-5 validate-bloc">
              <h6>Thank you for your registration, you have now received a validation email.</h6>
              <span>Please validate your email in order to Log in.</span>
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

export default Register;
