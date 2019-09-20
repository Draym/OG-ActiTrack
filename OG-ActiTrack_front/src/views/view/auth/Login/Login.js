import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Row
} from 'reactstrap';
import HttpUtils from "../../../../utils/api/HttpUtils";
import TString from "../../../../utils/TString";
import CFormInput from "../../../components/CFormInput";
import UserSession from "../../../../utils/storage/UserSession";
import {withTranslation} from 'react-i18next';
import {ApiEndpoint} from "../../../../utils/api/ApiEndpoint";
import CButtonLoading from "../../../components/CButton/CButtonLoading";
import {RoutesEndpoint} from "../../../../utils/RoutesEndpoint";

import '../custom.css';
import './login.css';
import TEncoder from "../../../../utils/TEncoder";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorEmail: '',
      errorPassword: '',
      loading: {
        login: false
      },
      redirect: TEncoder.b64ToString(TString.extractUrlParam("redirect", this.props.location.search))
    };
    console.log("redirect: ", this.state.redirect, this.props);
    this.triggerLogin = this.triggerLogin.bind(this);
    this.triggerForgotPassword = this.triggerForgotPassword.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }


  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  triggerLogin(event) {
    event.preventDefault();
    this.setState({loading: {login: true}});
    console.log("Login", this.state);
    if (TString.isNull(this.state.password) || TString.isNull(this.state.email)) {
      this.setState({
        errorEmail: (TString.isNull(this.state.email) ? 'Please enter an email.' : ''),
        errorPassword: (TString.isNull(this.state.password) ? 'Please enter a password.' : ''),
        loading: {login: false}
      });
      return;
    }
    console.log("fetch");
    let auth = {
      'email': this.state.email,
      'password': this.state.password,
      'origin': 'OG-ActiTrack_front'
    };
    HttpUtils.POST(process.env.REACT_APP_SERVER_URL, ApiEndpoint.AUTH_Login, auth, function (data) {
      this.setState({loading: {login: false}});
      if (data) {
        UserSession.storeSession(data);
        this.props.history.push(this.state.redirect ? this.state.redirect : RoutesEndpoint.HOME);
      }
    }.bind(this), function (errorStatus, error) {
      console.log(error);
      this.setState({
        errorEmail: (error.indexOf("password") === -1 ? error : ''),
        errorPassword: (error.indexOf("password") !== -1 ? error : ''),
        loading: {login: false}
      });
    }.bind(this));
  }

  triggerForgotPassword() {
    this.props.history.push(RoutesEndpoint.AUTH_ForgetPassword);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value, errorEmail: ''});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value, errorPassword: ''});
  }

  render() {
    const {t, i18n} = this.props;
    return (
      <div className="flex-row align-items-center">
        <Container style={{'marginTop': 7 + 'em'}}>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody className="p-2">
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <CFormInput gui={{headIcon: "fa fa-at"}} type={"text"} placeHolder={"Email"}
                                  value={this.state.email} onChange={this.handleEmailChange}
                                  error={this.state.errorEmail}/>
                      <CFormInput gui={{headIcon: "icon-lock"}} type={"password"} placeHolder={"Password"}
                                  value={this.state.password} onChange={this.handlePasswordChange}
                                  error={this.state.errorPassword}/>
                      <Row>
                        <Col xs="6">
                          <CButtonLoading color="primary" onClick={this.triggerLogin}
                                          loading={this.state.loading.login}
                                          className="px-5 m-2 mx-4"
                                          text="Login"
                                          loadingText="Logging"/>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0" onClick={this.triggerForgotPassword}>Forgot
                            password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none">
                  <CardBody className="text-center">
                    <div>
                      <h2>{t('page.login.signUp.title')}</h2>
                      <p>{t('page.login.signUp.txtBody')}</p>
                      <Link to={RoutesEndpoint.AUTH_Register}>
                        <Button color="primary" className="mt-3" active
                                tabIndex={-1}>{t('page.login.signUp.btnRegister')}</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withTranslation()(Login);
