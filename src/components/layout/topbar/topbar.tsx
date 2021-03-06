import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../redux/actions/authenticate";
import { RootStoreI } from "../../../redux/reducers";

function TopBar() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootStoreI) => state.auth.user);

  const logOutFromApp = () => {
    dispatch(logOut());
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
