import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import CFormSubmit from "../../../Components/CFormSubmit";
import {ApiEndpoint} from "../../../../Utils/api/ApiEndpoint";
import CFormInput from "../../../Components/CFormInput";
import UserSession from "../../../../Utils/UserSession";


class Contact extends Component {
  constructor(props) {
    super(props);
    let session = UserSession.getSession();
    this.state = {
      email: session.user.email
    };
    this.success = this.success.bind(this);
  }

  success(success) {
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md={8}>
            <CFormSubmit endpoint={ApiEndpoint.USER_Contact} requirements={['email', 'subject', 'message']} success={this.success}
                         title="Contact us" submitTitle="Send message" col={12}>
              <CFormInput dataKey='email' gui={{headIcon: "fa fa-at"}} type={"text"} title={"Email"}
                          defaultValue={this.state.email} disabled={true} col={5}/>
              <CFormInput dataKey='subject' gui={{headIcon: "icon-envelope-open"}} type={"text"} title={"Subject"}
                          placeHolder={"subject of your message"} col={8}/>
              <CFormInput dataKey='message' type={"textarea"} title={"Message"}
                          placeHolder={"Your message here..."} rows="9"/>
            </CFormSubmit>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Contact;
