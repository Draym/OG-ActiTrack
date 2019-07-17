import React, {Component, Suspense} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';

import routes from '../../../routes-account';
import {RoutesEndpoint} from "../../../Utils/RoutesEndpoint";
import {
  Col,
  Row
} from 'reactstrap';
import AccountMenu from "./AccountMenu";

class AccountLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  render() {
    return (
      <div>
          <Suspense fallback={this.loading()}>
            <Row>
              <Col md={2}>
                <AccountMenu/>
              </Col>
              <Col md={10}>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => (
                        <route.component {...props} />
                      )}/>
                  ) : (null);
                })}
                <Redirect path="*" to={RoutesEndpoint["404"]}/>
              </Switch>
              </Col>
            </Row>
          </Suspense>
      </div>
    );
  }
}

export default AccountLayout;
