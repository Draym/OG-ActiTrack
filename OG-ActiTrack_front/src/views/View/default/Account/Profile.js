import React, {Component} from 'react';
import CFormSubmit from "../../../Components/CFormSubmit";
import {ApiEndpoint} from "../../../../Utils/ApiEndpoint";
import CFormInput from "../../../Components/CFormInput";
import {
  Row,
  Col
} from "reactstrap/es";


class Profile extends Component {

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col md={8}>
            <CFormSubmit endpoint={ApiEndpoint.USER_Update} requirements={['pseudo']} title="Update your profile" submitTitle="Update" col={8}>
              <CFormInput dataKey='pseudo' gui={{headText: "Pseudo"}} type={"text"} placeHolder={"new pseudo"}/>
              <CFormInput dataKey='avatar' gui={{headText: "Avatar"}} type={"text"} disabled={true}/>
            </CFormSubmit>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <CFormSubmit endpoint={ApiEndpoint.USER_Update} requirements={['email']} title="Modify your email" submitTitle="Validate email" col={8}>
              <CFormInput dataKey='email' gui={{headIcon: "fa fa-at"}} type={"text"} placeHolder={"new email"}/>
            </CFormSubmit>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Profile;
