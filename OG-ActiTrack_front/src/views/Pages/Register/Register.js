import React, {Component, Suspense} from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import {AppFooter, AppHeader} from "@coreui/react";
import MinimalHeader from '../../../containers/MinimalLayout/MinimalHeader';
import MinimalFooter from '../../../containers/MinimalLayout/MinimalFooter';

class Register extends Component {
  url = 'localhost:9090/api/';

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      repeatPassword: ''
    };
    this.triggerRegister = this.triggerRegister.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(this);
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  triggerRegister(event) {
    event.preventDefault();
    console.log("Register", this.state);
    if (!this.state.password || !this.state.email || !this.state.username)
      return;
    if (this.state.password !== this.state.repeatPassword)
      return;
    console.log("fetch");
    let auth = {
      'email': this.state.email,
      'pseudo': this.state.username,
      'password': this.state.password
    };
    fetch(this.url + 'auth/register', {
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
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleRepeatPasswordChange(event) {
    this.setState({repeatPassword: event.target.value});
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
                  <Col md="9" lg="7" xl="6">
                    <Card className="mx-4">
                      <CardBody className="p-4">
                        <Form>
                          <h1>Register</h1>
                          <p className="text-muted">Create your account</p>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-user"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Username" autoComplete="username" alue={this.state.email}
                                   onChange={this.handleEmailChange}/>
                          </InputGroup>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>@</InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Email" autoComplete="email" alue={this.state.username}
                                   onChange={this.handleUsernameChange}/>
                          </InputGroup>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-lock"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="password" placeholder="Password" autoComplete="new-password"
                                   alue={this.state.password}
                                   onChange={this.handlePasswordChange}/>
                          </InputGroup>
                          <InputGroup className="mb-4">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="icon-lock"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="password" placeholder="Repeat password" autoComplete="new-password"
                                   alue={this.state.repeatPassword}
                                   onChange={this.handleRepeatPasswordChange}/>
                          </InputGroup>
                          <Button color="success" type="submit" block onClick={this.triggerRegister}>Create Account</Button>
                        </Form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </div>
          </main>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <MinimalFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default Register;
