import React, {Component, Suspense} from 'react';
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
import {
  AppFooter,
  AppHeader
} from "@coreui/react";
import MinimalHeader from '../../Containers/MinimalLayout/MinimalHeader';
import MinimalFooter from '../../Containers/MinimalLayout/MinimalFooter';
import HttpUtils from "../../../Utils/HttpUtils";
import TString from "../../../Utils/TString";
import CFormInput from "../../Components/CFormInput/CFormInput";
import UserSession from "../../../Utils/UserSession";
import { withTranslation } from 'react-i18next';
import '../custom.css';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorEmail: '',
      errorPassword: ''
    };
    this.triggerLogin = this.triggerLogin.bind(this);
    this.triggerForgotPassword = this.triggerForgotPassword.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }


  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  triggerLogin(event) {
    event.preventDefault();
    console.log("Login", this.state);
    if (TString.isNull(this.state.password) || TString.isNull(this.state.email)) {
      this.setState({
        errorEmail: (TString.isNull(this.state.email) ? 'Please enter an email.' : ''),
        errorPassword: (TString.isNull(this.state.password) ? 'Please enter a password.' : '')
      });
      return;
    }
    console.log("fetch");
    let auth = {
      'email': this.state.email,
      'password': this.state.password,
      'origin': 'OG-ActiTrack_front'
    };
    HttpUtils().POST(process.env.REACT_APP_SERVER_URL, '/auth/login', auth, function (data) {
      console.log(data);
      if (data) {
        UserSession.storeSession(data);
        this.props.history.push("/");
      }
    }.bind(this), function (errorStatus, error) {
      console.log(error);
      this.setState({
        errorEmail: (error.indexOf("password") === -1 ? error : ''),
        errorPassword: (error.indexOf("password") !== -1 ? error : '')
      });
    }.bind(this));
  }

  triggerForgotPassword() {
    this.props.history.push("/auth/forgot-password");
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value, errorEmail: ''});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value, errorPassword: ''});
  }

  render() {
    const { t, i18n } = this.props;
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
                  <Col md="8">
                    <CardGroup>
                      <Card className="p-4">
                        <CardBody>
                          <Form>
                            <h1>Login</h1>
                            <p className="text-muted">Sign In to your account</p>
                            <CFormInput icon={"fa fa-at"} type={"text"} placeHolder={"Email"} autoComplete={"email"}
                                        value={this.state.email} onChange={this.handleEmailChange}
                                        error={this.state.errorEmail}/>
                            <CFormInput icon={"icon-lock"} type={"password"} placeHolder={"Password"}
                                        autoComplete={"current-password"} value={this.state.password}
                                        onChange={this.handlePasswordChange} error={this.state.errorPassword}/>
                            <Row>
                              <Col xs="6">
                                <Button color="primary" className="px-4" type="submit"
                                        onClick={this.triggerLogin}>Login</Button>
                              </Col>
                              <Col xs="6" className="text-right">
                                <Button color="link" className="px-0" onClick={this.triggerForgotPassword}>Forgot
                                  password?</Button>
                              </Col>
                            </Row>
                          </Form>
                        </CardBody>
                      </Card>
                      <Card className="text-white bg-primary py-5 d-md-down-none" style={{width: '44%'}}>
                        <CardBody className="text-center">
                          <div>
                            <h2>{t('page.login.signUp.title')}</h2>
                            <p>{t('page.login.signUp.txtBody')}</p>
                            <Link to="/register">
                              <Button color="primary" className="mt-3" active tabIndex={-1}>{t('page.login.signUp.btnRegister')}</Button>
                            </Link>
                          </div>
                        </CardBody>
                      </Card>
                    </CardGroup>
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

export default withTranslation()(Login);
