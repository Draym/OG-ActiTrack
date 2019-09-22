import React, {Component} from 'react';
import CFormSubmit from "../../../components/CFormSubmit";
import {ApiEndpoint} from "../../../../utils/api/ApiEndpoint";
import CFormInput from "../../../components/CFormInput";
import {
  Row,
  Col
} from "reactstrap/es";
import UserSession from "../../../../utils/storage/UserSession";
import TSessionTransform from "../../../../utils/TSessionTransform";


class Profile extends Component {
  constructor(props) {
    super(props);
    let session = UserSession.getSession();
    this.state = {
      pseudo: session.user.pseudo,
      email: session.user.email,
      profileId: TSessionTransform.getProfileId(session)
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
          <Col xs={12} sm={12} md={12} lg={12} xl={8}>
            <CFormSubmit endpoint={ApiEndpoint.USER_Update} requirements={['pseudo']} success={this.success}
                         title="Update your profile" submitTitle="Update" col={8}>
              <CFormInput dataKey='pseudo' gui={{headIcon: "icon-user"}} type={"text"} title={"Your pseudo"}
                          placeHolder={"type a new pseudo"} defaultValue={this.state.pseudo}/>
              <CFormInput dataKey='avatar' gui={{headIcon: "icon-social-instagram"}} type={"text"} title={"Profile avatar"}
                          placeHolder={"not available yet"} disabled={true}/>
              <CFormInput gui={{headIcon: "fa fa-user-plus"}} type={"text"} title={"Profile ID: to share with friends"}
                          defaultValue={this.state.profileId}/>
            </CFormSubmit>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={8}>
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
