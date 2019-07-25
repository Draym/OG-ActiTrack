import React, {Component} from 'react';
import {Col, Row} from "reactstrap/es";
import {InputGroup} from "reactstrap";

class COptionalCol extends Component {

  render() {
    return (
      <div className={(this.props.className ? this.props.className : "")}>
        {
          this.props.col ? (
            <Row>
              <Col md={this.props.col}>
                {this.props.children}
              </Col>
            </Row>
          ) : (
            <div>
              {this.props.children}
            </div>
          )
        }
      </div>
    );
  }
}

export default COptionalCol;
