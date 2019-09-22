import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import UserSession from "../../../../utils/storage/UserSession";
import CFormSubmit from "../../../components/CFormSubmit";
import {ApiEndpoint} from "../../../../utils/api/ApiEndpoint";
import CFormInput from "../../../components/CFormInput";
import CDatePicker from "../../../components/CDatePicker";
import {EDatePicker} from "../../../components/CDatePicker/EDatePicker";


class BugReport extends Component {
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
            <CFormSubmit endpoint={ApiEndpoint.USER_BugReport} requirements={['email', 'subject', 'description']} success={this.success}
                         title="Contact us" submitTitle="Send message" col={12}>
              <CFormInput dataKey='email' gui={{headIcon: "fa fa-at"}} type={"text"} title={"Email"}
                          defaultValue={this.state.email} disabled={true} col={5}/>
              <CFormInput dataKey='subject' gui={{headIcon: "icon-envelope-open"}} type={"text"} title={"Subject"}
                          placeHolder={"subject of your report"} col={8}/>
              <CDatePicker dataKey='eventDate' dateTypeSelected={EDatePicker.DayInputPicker}
                           title={"When did your meet the bug?"}/>

              <CFormInput className="mt-4" dataKey='description' type={"textarea"} title={"Bug Description & Steps to reproduce:"}
                          placeHolder={"Please describe the bug as much as possible."} rows="9"/>
            </CFormSubmit>
          </Col>
        </Row>
      </div>
    )
  }
}

export default BugReport;
