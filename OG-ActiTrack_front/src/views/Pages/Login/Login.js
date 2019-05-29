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
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import {
  AppFooter,
  AppHeader
} from "@coreui/react";
import './login.css';
import MinimalHeader from '../../Containers/MinimalLayout/MinimalHeader';
import MinimalFooter from '../../Containers/MinimalLayout/MinimalFooter';

class Login extends Component {
  url = 'http://localhost:9090/api/';

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.triggerLogin = this.triggerLogin.bind(this);
    this.triggerForgotPassword = this.triggerForgotPassword.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }


  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  triggerLogin(event) {
    event.preventDefault();
    console.log("Login", this.state);
    if (!this.state.password || !this.state.email)
      return;
    console.log("fetch");
    let auth = {
      'email': this.state.email,
      'password': this.state.password,
      'origin': 'OG-ActiTrack_front'
    };
    fetch(this.url + 'auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(auth)
    }).then(response => {
      console.log(response);
      if (response.status === 200) {
        response.json().then(function (data) {
          if (!data.hasError) {
            console.log(data.result);
          } else {
            console.log(data.error);
          }
        });
      } else {

      }
    }).catch(error => {
      console.log(error);
    });
    return false;
  }

  triggerForgotPassword() {

  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  render() {
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
                            <InputGroup className="mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-user"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input type="text" placeholder="Email" autoComplete="email" value={this.state.email}
                                     onChange={this.handleEmailChange}/>
                            </InputGroup>
                            <InputGroup className="mb-4">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="icon-lock"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input type="password" placeholder="Password" autoComplete="current-password"
                                     value={this.state.password} onChange={this.handlePasswordChange}/>
                            </InputGroup>
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
                            <h2>Sign up</h2>
                            <p>If you do not have an account yet, please sign up. It only takes a few click.</p>
                            <Link to="/register">
                              <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
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
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <MinimalFooter/>
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default Login;
