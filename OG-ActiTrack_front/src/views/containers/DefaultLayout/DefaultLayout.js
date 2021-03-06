import React, {Component, Suspense} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import * as router from 'react-router-dom';
import {Container} from 'reactstrap';

import {
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../../_nav';
// routesDefault config
import routes from '../../../routes-default';
import CLanguageCtrl from "../../components/CLanguageCtrl";
import {RoutesEndpoint} from "../../../utils/RoutesEndpoint";
import AuthUtils from "../../../utils/auth/AuthUtils";
import TLogs from "../../../utils/TLogs";

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navs: AuthUtils.navAuthorized(navigation)
    };
    TLogs.p("NAV Available: ", this.state.navs);
  }
  UNSAFE_componentWillUpdate(prevProps, prevState, snapshot) {
    this.state.navs = AuthUtils.navAuthorized(navigation);
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader {...this.props}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader/>
            <AppSidebarForm/>
            <Suspense>
              <AppSidebarNav navConfig={this.state.navs} {...this.props} router={router}/>
            </Suspense>
            <CLanguageCtrl/>
            <AppSidebarFooter/>
          </AppSidebar>
          <main className="main">
            {this.props.location.pathname.indexOf("/account") < 0 && <AppBreadcrumb appRoutes={routes} router={router}/>}
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
                          (!route.restricted || AuthUtils.isAuthorized(route.restricted) ?
                            <route.component {...props} /> :
                            <Redirect to={{pathname: '/404', state: {from: props.location}}}/>)
                        )}/>
                    ) : (null);
                  })}
                  <Redirect path="*" to={RoutesEndpoint["404"]}/>
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter/>
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
