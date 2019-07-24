import React, {Component} from 'react';
import CFormSubmit from "../../../Components/CFormSubmit";
import {ApiEndpoint} from "../../../../Utils/api/ApiEndpoint";
import CFormInput from "../../../Components/CFormInput";
import {
  Row,
  Col
} from "reactstrap/es";
import UserSession from "../../../../Utils/UserSession";


class Profile extends Component {
  constructor(props) {
    super(props);
    let session = UserSession.getSession();
    console.log("haha");
    this.state = {
      pseudo: session.user.pseudo,
      email: session.user.email
    };
    this.success = this.success.bind(this);
  }

  success(user) {
    UserSession.updateUser(user);
  }

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col md={8}>
            <CFormSubmit endpoint={ApiEndpoint.USER_Update} requirements={['pseudo']} success={this.success}
                         title="Update your profile" submitTitle="Update" col={8}>
              <CFormInput dataKey='pseudo' gui={{headText: "Pseudo"}} type={"text"} placeHolder={"type a new pseudo"} defaultValue={this.state.pseudo}/>
              <CFormInput dataKey='avatar' gui={{headText: "Avatar"}} type={"text"} disabled={true}/>
            </CFormSubmit>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <CFormSubmit endpoint={ApiEndpoint.USER_Update} requirements={['email']} success={this.success}
                         title="Modify your email" submitTitle="Validate email" col={8}>
              <CFormInput dataKey='email' gui={{headIcon: "fa fa-at"}} type={"text"} placeHolder={"type a new email"} defaultValue={this.state.email}/>
            </CFormSubmit>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Profile;
