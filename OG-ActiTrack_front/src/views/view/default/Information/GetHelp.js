import React, {Component} from 'react';
import {Card, CardBody, Col, Row} from 'reactstrap';
import CAccordion from "../../../components/CAccordion/CAccordion";
import CAccordionItem from "../../../components/CAccordion/CAccordionItem";
import {RoutesEndpoint} from "../../../../utils/RoutesEndpoint";

class GetHelp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="animated fadeIn mb-2">
        <Card>
          <CardBody>
            <Row className="mb-4">
              <Col>
                <h3>
                  Hey there 👋 how can we help ?
                </h3>
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                <CAccordion color="light" multiple>
                  <CAccordionItem title={"How to use OG-Tracker ?"}>
                    <span>haha</span>
                  </CAccordionItem>
                  <CAccordionItem title={"Where is my profile ?"}>
                    <span>haha</span>
                  </CAccordionItem>
                  <CAccordionItem title={"How to change my password ?"}>
                    <span>haha</span>
                  </CAccordionItem>
                  <CAccordionItem title={"How to add a friend ?"}>
                    <span>haha</span>
                  </CAccordionItem>
                  <CAccordionItem title={"How to contact us ?"}>
                    <span>haha</span>
                  </CAccordionItem>
                  <CAccordionItem title={"How to report a bug ?"}>
                    <span>haha</span>
                  </CAccordionItem>
                </CAccordion>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                <CAccordion color="light">
                  <CAccordionItem title={"What is the premium access?"}>
                    <span>haha</span>
                  </CAccordionItem>
                  <CAccordionItem title={"How can i share data with friends ?"}>
                    <span>haha</span>
                  </CAccordionItem>
                  <CAccordionItem title={"How does my friend list impact me ?"}>
                    <span>haha</span>
                  </CAccordionItem>
                  <CAccordionItem title={"How OG-Tracker retrieve data ?"}>
                    <span>haha</span>
                  </CAccordionItem>
                  <CAccordionItem title={"Do i track my own activity ?"}>
                    <span>haha</span>
                  </CAccordionItem>
                  <CAccordionItem title={"What data OG-Tracker is using ?"}>
                    <span>haha</span>
                  </CAccordionItem>
                </CAccordion>
              </Col>
            </Row>
            <Row className="mt-7 mb-3">
              <Col>
                <h5>
                  Looking for something else ? <a href={RoutesEndpoint.ACCOUNT_Contact}>Please contact us 📧</a>
                </h5>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default GetHelp;
