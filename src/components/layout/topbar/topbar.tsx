import React, { Fragment } from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../redux/actions/authenticate";
import { RootStoreI } from "../../../redux/reducers";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

type PropsI = {
  page: string;
};

const getBreadCrumbs = (page: string) => {
  switch (page) {
    case "organization":
      return {
        pageName: "Organizations",
      };
    case "organizationDetails":
      return {
        pageName: "Organization Details",
        backTo: "/organizations",
      };

      case "Leads":
        return {
          pageName: "Leads",
          backTo: "/",
        };
    default:
      return {
        pageName: "Control Panel",
      };
  }
};

function TopBar(props: PropsI) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state: RootStoreI) => state.auth.user);
  const logOutFromApp = async () => {
    await dispatch(logOut());
    history.replace("/login");
  };

  const { pageName, backTo } = getBreadCrumbs(props.page);

  return (
    <div className="top-bar-container">
      <div className="top-bar-content">
        <div style={{ display: "flex", alignItems: "center" }}>
          {backTo ? (
            <Fragment>
              <NavLink to={backTo}>
                <IconButton>
                  <ArrowBackIcon />
                </IconButton>{" "}
              </NavLink>
              <h4> {pageName} </h4>{" "}
            </Fragment>
          ) : (
            <h4>{pageName}</h4>
          )}
        </div>
        <div>
          <IconButton onClick={logOutFromApp}>
            <ExitToAppIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
