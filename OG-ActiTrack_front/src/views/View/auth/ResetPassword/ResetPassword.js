import React, {Component, Suspense} from 'react';
import {
  Button,
  Card,
  CardBody, CardHeader,
  Col,
  Container,
  Form,
  Row,
} from 'reactstrap';
import {
  AppFooter,
  AppHeader
} from "@coreui/react";
import AuthHeader from '../../../Containers/AuthLayout/AuthHeader';
import AuthFooter from '../../../Containers/AuthLayout/AuthFooter';
import HttpUtils from "../../../../Utils/HttpUtils";
import TString from "../../../../Utils/TString";
import CFormInput from "../../../Components/CFormInput";
import {ClipLoader} from "react-spinners";
import {css} from "@emotion/core";
import '../custom.css';
import './resetPassword.css';
import {ApiEndpoint} from "../../../../Utils/ApiEndpoint";
import {RoutesEndpoint} from "../../../../Utils/RoutesEndpoint";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resetToken: this.props.match.params.token,
      contactEmail: process.env.REACT_APP_CONTACT_EMAIL,
      password: '',
      passwordVerify: '',
      errorPassword: '',
      errorVerifyPassword: '',
      isTokenValid: false,
      isJobDone: false,
      loading: true
    };
    this.triggerHome = this.triggerHome.bind(this);
    this.triggerLogin = this.triggerLogin.bind(this);
    this.verifyResetToken = this.verifyResetToken.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordVerifyChange = this.handlePasswordVerifyChange.bind(this);
    this.triggerResetPassword = this.triggerResetPassword.bind(this);

    this.verifyResetToken();
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  verifyResetToken() {
    if (!this.state.resetToken) {
      this.setState({
        isTokenValid: false,
        loading: false
      });
      return;
    }

    let data = {
      token: this.state.resetToken
    };
    HttpUtils().GET(process.env.REACT_APP_SERVER_URL, ApiEndpoint.AUTH_CheckResetPasswordToken, data, function (data) {
      setTimeout(function () {
        this.setState({
          isTokenValid: true,
          loading: false
        });
      }.bind(this), 1000)
    }.bind(this), function (errorStatus, error) {
      console.log(error);
      this.setState({
        isTokenValid: false,
        loading: false,
        errorMessage: error
      });
    }.bind(this));
  }

  triggerResetPassword(event) {
    event.preventDefault();
    console.log("Register", this.state);
    if (TString.isNull(this.state.password)) {
      this.setState({
        errorPassword: 'Please enter a password.'
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
      'resetToken': this.state.resetToken,
      'password': this.state.password
    };
    HttpUtils().POST(process.env.REACT_APP_SERVER_URL, ApiEndpoint.AUTH_ResetPassword, auth, function (data) {
      if (data) {
        this.setState({isJobDone: true});
      }
    }.bind(this), function (errorStatus, error) {
      this.setState({
        errorPassword: error
      });
    }.bind(this));
  }

  triggerHome() {
    this.props.history.push(RoutesEndpoint.HOME);
  }

  triggerLogin() {
    this.props.history.push(RoutesEndpoint.AUTH_Login);
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value, errorPassword: ''});
  }

  handlePasswordVerifyChange(event) {
    this.setState({passwordVerify: event.target.value, errorPasswordVerify: ''});
  }

  render() {
    let drawResetPassword = function () {
      if (this.state.isTokenValid) {
        return (
          <Card className="mx-4">
            <CardBody className="p-5">
              <Form>
                <h2>Reset your password</h2>
                <CFormInput gui={{headIcon: "icon-lock"}} type={"password"} placeHolder={"Password"}
                            autoComplete={"current-password"} value={this.state.password}
                            onChange={this.handlePasswordChange} error={this.state.errorPassword}/>
                <CFormInput gui={{headIcon: "icon-lock"}} type={"password"} placeHolder={"Verify Password"}
                            autoComplete={"new-password"} value={this.state.passwordVerify}
                            onChange={this.handlePasswordVerifyChange}
                            error={this.state.errorVerifyPassword}/>
                <Button color="success" type="submit" block
                        onClick={this.triggerResetPassword}>Update</Button>
              </Form>
            </CardBody>
          </Card>
        );
      } else {
        return (
          <Card className="card-accent-danger">
            <CardHeader>
              An error occurred
            </CardHeader>
            <CardBody className="p-5 validate-bloc">
              <h6>We are sorry but the link used to change your password is invalid.</h6>
              <span>{this.state.errorMessage} </span>
              <span>Please contact {this.state.contactEmail} or click bellow to go back</span>
              <Row className="justify-content-center">
                <Button color="secondary" className="px-4" type="button"
                        onClick={this.triggerHome}>Back to Home</Button>
              </Row>
            </CardBody>
          </Card>
        );
      }
    }.bind(this);
    let drawCurrentState = function () {
      if (this.state.isJobDone) {
        return (
          <Card className="card-accent-info">
            <CardHeader>
              Your password has been successfully modified
            </CardHeader>
            <CardBody className="p-4 validate-bloc">
              <h6>Please Log in with your new password.</h6>
              <Row className="justify-content-center">
                <Button color="secondary" className="px-4" type="button"
                        onClick={this.triggerLogin}>Back to Log in</Button>
              </Row>
            </CardBody>
          </Card>
        );
      } else {
        return drawResetPassword();
      }
    }.bind(this);
    let isLoading = function () {
      if (this.state.loading)
        return (
          <div className='sweet-loading'>
            <ClipLoader
              css={override}
              sizeUnit={"px"}
              size={200}
              color={'#219eca'}
              loading={this.state.loading}
            />
          </div>
        );
      else {
        return (
          <Col md="9" lg="7" xl="6">
            {drawCurrentState()}
          </Col>
        );
      }
    }.bind(this);
    return (
      <div className="flex-row align-items-center">
        <Container style={{'marginTop': 7 + 'em'}}>
          <Row className="justify-content-center">
            {isLoading()}
          </Row>
        </Container>
      </div>
    );
  }
}

export default ResetPassword;
