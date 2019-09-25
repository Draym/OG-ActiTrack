import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import CAccordion from "../../../components/CAccordion/CAccordion";
import CAccordionItem from "../../../components/CAccordion/CAccordionItem";

class GetHelp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs={12} sm={12} md={12} lg={6} xl={6}>
            <CAccordion color="light" multiple>
              <CAccordionItem title={"salut1"} text={"haha"}/>
              <CAccordionItem title={"salut2"} text={"haha"}/>
              <CAccordionItem title={"salut3"} text={"haha"}/>
              <CAccordionItem title={"salut4"} text={"haha"}/>
              <CAccordionItem title={"salut5"} text={"haha"}/>
            </CAccordion>
          </Col>
          <Col xs={12} sm={12} md={12} lg={6} xl={6}>
            <CAccordion color="light">
              <CAccordionItem title={"salut1"} text={"haha"}/>
              <CAccordionItem title={"salut2"} text={"haha"}/>
              <CAccordionItem title={"salut3"} text={"haha"}/>
              <CAccordionItem title={"salut4"} text={"haha"}/>
              <CAccordionItem title={"salut5"} text={"haha"}/>
            </CAccordion>
          </Col>
        </Row>
      </div>
    )
  }
}

export default GetHelp;
