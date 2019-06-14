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
import {
  AppFooter,
  AppHeader
} from "@coreui/react";
import MinimalHeader from '../../Containers/MinimalLayout/MinimalHeader';
import MinimalFooter from '../../Containers/MinimalLayout/MinimalFooter';
import HttpUtils from "../../../Utils/HttpUtils";
import TString from "../../../Utils/TString";
import CBlocError from "../../Components/CBlocError";
import CFormInput from "../../Components/CForms/CFormInput";
import '../custom.css';
import './forgotPassword.css';

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
    console.log("Forgot", this.state);
    if (TString.isNull(this.state.email)) {
      this.setState({
        errorEmail: 'Please enter an email.'
      });
      return;
    }
    let data = {
      'email': this.state.email
    };
    HttpUtils().GET(process.env.REACT_APP_SERVER_URL, '/auth/forgot-password', data, function (data) {
      console.log(data);
      if (data) {
        this.setState({jobIsDone: true})
      }
    }.bind(this), function (errorStatus, error) {
      console.log(error);
      this.setState({
        errorMessage: error
      });
    }.bind(this));
  }

  triggerHome() {
    this.props.history.push("/");
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
                <p className="text-muted">please enter your email</p>
                <CFormInput gui={{headIcon: "icon-user"}} type={"text"} placeHolder={"Email"}
                            value={this.state.email} onChange={this.handleEmailChange}
                            error={this.state.errorEmail}/>
                <Button color="primary" type="submit" block onClick={this.triggerForgotPassword}>Send me a
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
              <h6>Please verify your email, you will find a secure link which will allow you to change your password.</h6>
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

export default ForgotPassword;
