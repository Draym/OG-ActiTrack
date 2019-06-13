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
import MinimalHeader from '../../Containers/MinimalLayout/MinimalHeader';
import MinimalFooter from '../../Containers/MinimalLayout/MinimalFooter';
import HttpUtils from "../../../Utils/HttpUtils";
import TString from "../../../Utils/TString";
import CFormInput from "../../Components/CForms/CFormInput";
import CBlocError from "../../Components/CBlocError";
import '../custom.css';
import './register.css';

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
      errorMessage: ''
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
    console.log("Register", this.state);
    if (TString.isNull(this.state.password) || TString.isNull(this.state.email) || TString.isNull(this.state.username)) {
      this.setState({
        errorEmail: (TString.isNull(this.state.email) ? 'Please enter an email.' : ''),
        errorUsername: (TString.isNull(this.state.username) ? 'Please enter an username.' : ''),
        errorPassword: (TString.isNull(this.state.password) ? 'Please enter a password.' : '')
      });
      return;
    }
    if (this.state.password !== this.state.passwordVerify) {
      this.setState({
        errorVerifyPassword: "The verification password does't match with the password."
      });
      return;
    }
    console.log("fetch");
    let auth = {
      'email': this.state.email,
      'pseudo': this.state.username,
      'password': this.state.password
    };
    HttpUtils().POST(process.env.REACT_APP_SERVER_URL, '/auth/register', auth, function (data) {
      if (data) {
        this.setState({
          jobIsDone: true
        });
      }
    }.bind(this), function (errorStatus, error) {
      this.setState({
        errorEmail: (error.indexOf("email") !== -1 ? error : ''),
        errorUsername: (error.indexOf("pseudo") !== -1 ? error : ''),
        errorMessage: (error.indexOf("email") === -1 && error.indexOf("pseudo") === -1 ? error : '')
      });
    }.bind(this));
  }

  triggerHome() {
    this.props.history.push("/");
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
                <CFormInput icon={"icon-user"} type={"text"} placeHolder={"Username"}
                            autoComplete={"username"} value={this.state.username}
                            onChange={this.handleUsernameChange} error={this.state.errorUsername}/>
                <CFormInput icon={"fa fa-at"} type={"text"} placeHolder={"Email"}
                            autoComplete={"email"} value={this.state.email}
                            onChange={this.handleEmailChange} error={this.state.errorEmail}/>
                <CFormInput icon={"icon-lock"} type={"password"} placeHolder={"Password"}
                            autoComplete={"current-password"} value={this.state.password}
                            onChange={this.handlePasswordChange} error={this.state.errorPassword}/>
                <CFormInput icon={"icon-lock"} type={"password"} placeHolder={"Repeat Password"}
                            autoComplete={"new-password"} value={this.state.passwordVerify}
                            onChange={this.handlePasswordVerifyChange} error={this.state.errorVerifyPassword}/>
                <Button color="success" type="submit" block onClick={this.triggerRegister}>Create Account</Button>
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
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <MinimalHeader/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <main className="main">
            <div className="flex-row align-items-center">
              <Container style={{'marginTop': 7 + 'em'}}>
                <Row className="justify-content-center">
                  <Col md="9" lg="7" xl="6">
                    {drawState()}
                  </Col>
                </Row>
              </Container>
            </div>
          </main>
        </div>
        <AppFooter className="minimalFooter">
          <Suspense fallback={this.loading()}>
            <MinimalFooter/>
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default Register;
