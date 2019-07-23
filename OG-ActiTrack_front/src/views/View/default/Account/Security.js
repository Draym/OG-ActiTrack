import React, {Component} from 'react';
import {Col, Form, Row} from 'reactstrap';
import CFormSubmit from "../../../Components/CFormSubmit";
import {ApiEndpoint} from "../../../../Utils/ApiEndpoint";
import CFormInput from "../../../Components/CFormInput";


class Security extends Component {

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col md={8}>
            <CFormSubmit endpoint={ApiEndpoint.USER_Update} requirements={['oldPassword', 'password', 'repeatPassword']}
                         title="Change your password" submitTitle="Update password" col={8}
                         desc="Please use a strong password with a combination of characters and numbers.">
              <span className="text-muted">Old password</span>
              <CFormInput dataKey='oldPassword' gui={{headIcon: "icon-lock"}} type={"password"}
                          placeHolder={"Old password"}/>
              <span className="text-muted">New password</span>
              <CFormInput dataKey='password' gui={{headIcon: "icon-lock"}} type={"password"}
                          placeHolder={"New password"}/>
              <CFormInput dataKey='repeatPassword' gui={{headIcon: "icon-lock"}} type={"password"}
                          placeHolder={"Repeat new password"}/>
            </CFormSubmit>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Security;
