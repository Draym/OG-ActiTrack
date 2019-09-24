import React, {Component, Suspense} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import routes from '../../../routes-account';
import {RoutesEndpoint} from "../../../utils/RoutesEndpoint";
import {
  Col,
  Row
} from 'reactstrap';
import AccountMenu from "./AccountMenu";
import AuthUtils from "../../../utils/auth/AuthUtils";

class AccountLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  render() {
    console.log("draw account layout");
    return (
      <div className="mt-3">
        <Suspense fallback={this.loading()}>
          <Row>
            <Col id="accountMenu" md={2}>
              <AccountMenu/>
            </Col>
            <Col id="accountContent" md={9}>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => (
                        (!route.restricted || AuthUtils.isAuthorized(route.restricted) ?
                          <route.component {...props} /> :
                          <Redirect to={{pathname: '/auth/login', state: {from: props.location}}}/>)
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
