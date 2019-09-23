import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import BtnKofiSupport from "../../../components/Widgets/buttons/BtnKofiSupport";


class Home extends Component {

  render() {

    return (
      <div className="animated fadeIn background-white">
        <Row>
          <Col>
          </Col>
        </Row>
        <Row>
          <Col>
          </Col>
        </Row>
        <Row>
          <Col>
            <BtnKofiSupport title/>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home;
