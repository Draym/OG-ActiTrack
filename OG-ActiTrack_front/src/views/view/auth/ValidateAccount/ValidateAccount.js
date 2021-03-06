import React, {Component} from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row
} from 'reactstrap';
import {css} from '@emotion/core';
import {ClipLoader} from 'react-spinners';
import HttpUtils from "../../../../utils/api/HttpUtils";
import '../custom.css';
import './validateAccount.css';
import {ApiEndpoint} from "../../../../utils/api/ApiEndpoint";
import {RoutesEndpoint} from "../../../../utils/RoutesEndpoint";
import TLogs from "../../../../utils/TLogs";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;


class ValidateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactEmail: process.env.REACT_APP_CONTACT_EMAIL,
      verificationLink: this.props.match.params.verificationLink,
      loading: true,
      isLinkValid: false,
      errorMessage: ''
    };
    this.verifyLink = this.verifyLink.bind(this);
    this.triggerLogin = this.triggerLogin.bind(this);
    this.triggerHome = this.triggerHome.bind(this);

    this.verifyLink();
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;


  verifyLink() {
    if (!this.state.verificationLink) {
      this.setState({
        isLinkValid: false,
        loading: false
      });
      return;
    }
    let data = {
      identifier: this.state.verificationLink
    };
    TLogs.p("ValidateAccount:", data);
    HttpUtils.GET(null, ApiEndpoint.AUTH_Validate, data, function (data) {
      setTimeout(function () {
        this.setState({
          isLinkValid: data === true,
          loading: false
        });
      }.bind(this), 1000)
    }.bind(this), function (errorStatus, error) {
      TLogs.p(error);
      this.setState({
        isLinkValid: false,
        loading: false,
        errorMessage: error
      });
    }.bind(this));
  }

  triggerLogin() {
    this.props.history.push(RoutesEndpoint.AUTH_Login);
  }

  triggerHome() {
    this.props.history.push(RoutesEndpoint.HOME);
  }

  render() {
    let drawVerificationLink = function () {
      if (this.state.isLinkValid) {
        return (
          <Card className="card-accent-info">
            <CardBody className="p-5 validate-bloc">
              <h4>Thank you for validating your account.</h4>
              <span>Please click the button bellow in order to log in.</span>
              <Row className="justify-content-center">
                <Button color="primary" className="px-4" type="button"
                        onClick={this.triggerLogin}>Login</Button>
              </Row>
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
              <h6>We are sorry but we are not able to validate your account.</h6>
              <span>{this.state.errorMessage} </span>
              <span>Please contact {this.state.contactEmail}</span>
              <Row className="justify-content-center">
                <Button color="secondary" className="px-4" type="button"
                        onClick={this.triggerHome}>Back to Home</Button>
              </Row>
            </CardBody>
          </Card>
        );
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
            {drawVerificationLink()}
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

export default ValidateAccount;
