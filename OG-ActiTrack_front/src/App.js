import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import {RoutesEndpoint} from "./Utils/RoutesEndpoint";

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./views/Containers/DefaultLayout'));
const AuthLayout = React.lazy(() => import('./views/Containers/AuthLayout'));

// Pages
const Page404 = React.lazy(() => import('./views/Pages/Page404'));

class App extends Component {

  render() {
    return (
      <BrowserRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path={RoutesEndpoint['404']} name="Page 404" render={props => <Page404 {...props}/>} />
              <Route path="/auth" name="Auth" render={props => <AuthLayout {...props}/>} />
              <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
            </Switch>
          </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
