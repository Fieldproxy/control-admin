import React from "react";
import Logo from "../../../assets/images/logo.png";
// import CloseIcon from "@material-ui/icons/Close";
// import IconButton from "@material-ui/core/IconButton";

function CompanyTitle() {
  return (
    <div className="companyTitle">
      <img src={Logo} alt="logo" />
      {/* <IconButton size="small" aria-label="delete">
        <CloseIcon />
      </IconButton> */}
    </div>
  );
}

export default CompanyTitle;
