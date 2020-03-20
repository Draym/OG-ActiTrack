import React, {Component} from 'react';
import {Col, Row} from 'reactstrap';
import CFormSubmit from "../../../components/CFormSubmit";
import {ApiEndpoint} from "../../../../utils/api/ApiEndpoint";
import CFormInput from "../../../components/CFormInput";
import UserSession from "../../../../utils/storage/UserSession";
import CBlockTitle from "../../../components/CBlockTitle/CBlockTitle";


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
          <Col xs={12} sm={12} md={12} lg={12} xl={8}>
            <CFormSubmit endpoint={ApiEndpoint.USER_Contact} requirements={['email', 'subject', 'message']}
                         success={this.success}
                         title="Contact us" submitTitle="Send message" col={12}>
              <CBlockTitle
                text="Feel free to contact me and ask any question using the following form. I will reply to your questions as soon as possible."
                small/>
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
