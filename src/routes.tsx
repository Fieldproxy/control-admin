import React, { Fragment } from "react";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Page1 from "./containers/page1";
import Page2 from "./containers/page2";
import NotFound from "./containers/notFound";
import Dashboard from "./containers/dashboard";
import AgentDetail from "./containers/agentDetail";
import Layout from "./components/layout";
import Login from "./containers/login";
import { RootStoreI } from "./redux/reducers";
import PrivateRoute from "./components/privateRoute";
 
function Routes() {
  const isLoggedIn = useSelector((state: RootStoreI) => state.auth.isLoggedIn);

  const protectedProps = {
    isAuthenticated: isLoggedIn,
    isAllowed: true,
    restrictedPath: "/dashboard",
    authenticationPath: "/login",
  };

  const RedirectToDashboard = () => {
    return <Redirect to="/dashboard" />;
  };

  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={RedirectToDashboard} />
          <Route path="/login" exact component={Login} />
          <Route
            render={(props) => (
              <Layout {...props}>
                <Switch>
                  <PrivateRoute
                    path="/dashboard"
                    exact
                    component={Dashboard}
                    {...protectedProps}
                  />
                  <PrivateRoute
                    path="/dashboard/:companyId"
                    exact
                    component={AgentDetail}
                    {...protectedProps}
                  />
                  <PrivateRoute
                    path="/page1"
                    exact
                    component={Page1}
                    {...protectedProps}
                  />
                  <PrivateRoute
                    path="/page2"
                    exact
                    component={Page2}
                    {...protectedProps}
                  />
                  <PrivateRoute component={NotFound} {...protectedProps} />
                </Switch>
              </Layout>
            )}
          />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}

export default Routes;
