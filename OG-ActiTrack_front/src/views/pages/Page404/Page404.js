import React, {Component, Suspense} from 'react';
import {Col, Container, Row} from 'reactstrap';
import AuthHeader from '../../containers/AuthLayout/AuthHeader';
import AuthFooter from '../../containers/AuthLayout/AuthFooter';
import {AppFooter, AppHeader} from "@coreui/react";

import errorImg from '../../../assets/img/404.png'

class Page404 extends Component {
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  render() {
    let imageNotFound = () =>
      <div>
        <h1 className="float-left display-3 mr-4">404</h1>
        <h4 className="pt-3">Oops! You're lost.</h4>
        <p className="text-muted float-left">The page you are looking for was not found.</p>
      </div>;

    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <AuthHeader/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <main className="main">
            <div className="flex-row align-items-center">
              <Container style={{'marginTop': 7 + 'em'}}>
                <Row className="justify-content-center">
                  <Col md="6">
                    <div className="clearfix">
                      <img src={errorImg} alt={imageNotFound()} className="img-center"/>
                    </div>
                    {/*
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
                    </InputGroup>*/}
                  </Col>
                </Row>
              </Container>
            </div>
          </main>
        </div>
        <AppFooter className="minimalFooter">
          <Suspense fallback={this.loading()}>
            <AuthFooter/>
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default Page404;
