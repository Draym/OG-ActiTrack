import React, {Component, Suspense} from 'react';
import {Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row} from 'reactstrap';
import MinimalHeader from '../../../containers/MinimalLayout/MinimalHeader';
import MinimalFooter from '../../../containers/MinimalLayout/MinimalFooter';
import {AppFooter, AppHeader} from "@coreui/react";

class Page500 extends Component {
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <MinimalHeader/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <main className="main">
            <div className="flex-row align-items-center">
              <Container style={{'marginTop': 7 + 'em'}}>
                <Row className="justify-content-center">
                  <Col md="6">
              <span className="clearfix">
                <h1 className="float-left display-3 mr-4">500</h1>
                <h4 className="pt-3">Houston, we have a problem!</h4>
                <p className="text-muted float-left">The page you are looking for is temporarily unavailable.</p>
              </span>
                    <InputGroup className="input-prepend">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-search"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input size="16" type="text" placeholder="What are you looking for?"/>
                      <InputGroupAddon addonType="append">
                        <Button color="info">Search</Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </Row>
              </Container>
            </div>
          </main>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <MinimalFooter/>
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default Page500;
