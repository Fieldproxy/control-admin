import React, { useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router";

export interface PrivateRouteProps extends RouteProps {
  isAuthenticated: boolean;
  isAllowed: boolean;
  restrictedPath: string;
  authenticationPath: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const [redirectPath, setRedirectPath] = useState("/login");

  useEffect(() => {
    // if (!props.isAuthenticated) {
    //   setRedirectPath(props.authenticationPath);
    // }
    // if (props.isAuthenticated && !props.isAllowed) {
    //   setRedirectPath(props.restrictedPath);
    // }
    // const alreadyLogged = localStorage.getItem("controlAdminIn");
    // if (alreadyLogged && alreadyLogged === "logged In") {
    //   setRedirectPath("");
    // } else {
    //   setRedirectPath(props.restrictedPath);
    // }
  }, []);

  if (localStorage.getItem("controlAdminIn") !== "logged In") {
    const renderComponent = () => (
      <Redirect
        to={{ pathname: redirectPath, state: { from: props.location } }}
      />
    );
    return <Route {...props} component={renderComponent} render={undefined} />;
  } else {
    return <Route {...props} />;
  }
};

export default PrivateRoute;
