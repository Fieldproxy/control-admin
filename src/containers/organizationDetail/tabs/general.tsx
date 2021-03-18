import React from "react";
import { useSelector } from "react-redux";
import { RootStoreI } from "../../../redux/reducers";
import Loader from "../../../components/loader";

function General() {
  const storeEmitter = (state: RootStoreI) => state.organizations;
  const { loadingCompanyDetail } = useSelector(storeEmitter);
  return (
    <div>
      {loadingCompanyDetail ? (
        <div style={{ height: 400 }}>
          {" "}
          <Loader />{" "}
        </div>
      ) : (
        <div> Company data </div>
      )}
    </div>
  );
}

export default General;
