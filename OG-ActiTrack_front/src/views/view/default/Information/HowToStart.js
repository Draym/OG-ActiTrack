import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';
import CBlockText from "../../../components/CBlockText/CBlockText";

class HowToStart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardBody>
            <h2>Welcome to OG-Tracker</h2>
            <Row>
              <Col>
                <CBlockText color="muted">
                  OG-Tracker is tool which will track other player activity while you are playing Ogame.
                  With the data collected, it can create activity reports and offer data analysis tools.
                </CBlockText>
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>1) How to subscribe to the website?</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>2) How to install the script?</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>3) How to use the website?</h4>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default HowToStart;
