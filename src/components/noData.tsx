import React from "react";
import NoDataImage from "../assets/images/nodata.svg";

type NoDataI = {
  data?: string;
};

function NoData(props: NoDataI) {
  return (
    <div className="no-data">
      <img src={NoDataImage} alt="No Data" />
      <h5> No {props.data ? props.data : "data"} to display </h5>
    </div>
  );
}

export default NoData;
