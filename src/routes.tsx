import React, { Fragment } from "react";

import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Page1 from "./containers/page1";
import Page2 from "./containers/page2";
import NotFound from "./containers/notFound";
import Organizations from "./containers/organizations";
import OrganizationDetail from "./containers/organizationDetail";
import Layout from "./components/layout";
import Login from "./containers/login";
import { RootStoreI } from "./redux/reducers";
import PrivateRoute from "./components/privateRoute";
import TopBar from "./components/layout/topbar";

const withLayout = <P extends object>(
  Component: React.ComponentType<P>,
  page: string
) => {
  return class wrapperLayout extends React.Component<P> {
    render() {
      return (
        <div className="layout-aside">
          <TopBar page={page} />
          <div className="content-container">
            <Component {...(this.props as P)} />
          </div>
        </div>
      );
    }
  };
};

function Routes() {
  const isLoggedIn = useSelector((state: RootStoreI) => state.auth.isLoggedIn);

  const protectedProps = {
    isAuthenticated: isLoggedIn,
    isAllowed: true,
    restrictedPath: "/organizations",
    authenticationPath: "/login",
  };

  const OrganizationPage = withLayout(Organizations, "organization");

  const OrganizationDetailPage = withLayout(
    OrganizationDetail,
    "organizationDetails"
  );

  const RedirectToDashboard = () => {
    return <Redirect to="/organizations" />;
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
                    path="/organizations"
                    exact
                    component={OrganizationPage}
                    {...protectedProps}
                  />
                  <PrivateRoute
                    path="/organizations/:companyId"
                    exact
                    name="organizationDetails"
                    component={OrganizationDetailPage}
                    {...protectedProps}
                  />
                  <PrivateRoute
                    path="/identifierstate"
                    exact
                    component={Page1}
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
