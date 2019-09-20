import React, {Component, Suspense} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';

import {
  AppFooter,
  AppHeader
} from '@coreui/react';
import routes from '../../../routes-auth';
import {RoutesEndpoint} from "../../../Utils/RoutesEndpoint";

const AuthFooter = React.lazy(() => import('./AuthFooter'));
const AuthHeader = React.lazy(() => import('./AuthHeader'));

class AuthLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <AuthHeader {...this.props}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <main className="main">
            <Container fluid>
              <Suspense fallback={this.loading()}>
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
                  <Redirect path="*" to={RoutesEndpoint["404"]} />
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <AuthFooter/>
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default AuthLayout;
