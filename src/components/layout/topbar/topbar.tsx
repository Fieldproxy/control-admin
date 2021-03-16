import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../redux/actions/authenticate";
import { RootStoreI } from "../../../redux/reducers";

import { useHistory } from "react-router-dom";

function TopBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state: RootStoreI) => state.auth.user);

  const logOutFromApp = async () => {
    await dispatch(logOut());
    history.replace("/login");
  };

  return (
    <div className="top-bar-container">
      <div className="top-bar-content">
        <h4>Welcome {user.name || "User"} </h4>
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
