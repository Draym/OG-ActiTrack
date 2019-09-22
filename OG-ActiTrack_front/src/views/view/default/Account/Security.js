import React, {Component} from 'react';
import {Col, Form, Row} from 'reactstrap';
import CFormSubmit from "../../../components/CFormSubmit";
import {ApiEndpoint} from "../../../../utils/api/ApiEndpoint";
import CFormInput from "../../../components/CFormInput";
import UserSession from "../../../../utils/storage/UserSession";


class Security extends Component {
  constructor(props) {
    super(props);
    this.success = this.success.bind(this);
  }

  success(success) {
  }

  verification(state) {
    return (state.data.password === state.data.repeatPassword);
  }

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={8}>
            <CFormSubmit endpoint={ApiEndpoint.USER_UpdatePassword}
                         success={this.success} verification={this.verification}
                         requirements={['oldPassword', 'password', 'repeatPassword']}
                         title="Change your password" submitTitle="Update password" col={8}
                         desc="Please use a strong password with a combination of characters and numbers.">
              <CFormInput dataKey='oldPassword' gui={{headIcon: "icon-lock-open"}} type={"password"}
                          placeHolder={"Old password"} title={"Old password"}/>
              <CFormInput dataKey='password' gui={{headIcon: "icon-lock"}} type={"password"}
                          placeHolder={"New password"} title={"New password"}/>
              <CFormInput dataKey='repeatPassword' gui={{headIcon: "icon-lock"}} type={"password"}
                          placeHolder={"Repeat new password"} title={"Repeat password"}/>
            </CFormSubmit>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Security;
